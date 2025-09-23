import { Injectable } from '@nestjs/common';
import {
  CursorPaginationParams,
  CursorPaginationResult,
  GetNextLinkPaginator,
} from '../interfaces';
import { SelectQueryBuilder } from 'typeorm';
import { BaseEntity } from '@/common/database';
import { EOrderPaginator } from '../etc/types';

@Injectable()
export class PaginatorService {
  async paginate<T extends BaseEntity>(
    qb: SelectQueryBuilder<T>,
    params: CursorPaginationParams,
  ): Promise<CursorPaginationResult<T>> {
    const {
      limit = 10,
      after,
      order = EOrderPaginator.ASC,
      baseUrl,
      extraParams,
      alias,
    } = params;
    const cursorField = 'createdAt';

    if (after) {
      qb.andWhere(
        `FLOOR(UNIX_TIMESTAMP(${alias}.${cursorField}) * 1000) ${order === EOrderPaginator.ASC ? '>' : '<='} :after`,
        {
          after: after,
        },
      );
    }

    qb.orderBy(`${alias}.${cursorField}`, order).limit(limit + 1);

    const result = await qb.getMany();

    const hasNextPage = result.length > limit;

    const data = hasNextPage ? result.slice(0, limit) : result;

    const endCursor =
      data.length > 0 ? (data[data.length - 1] as any)[cursorField] : null;

    const nextLink = this._getNextLink({
      hasNextPage,
      endCursor,
      limit,
      order,
      baseUrl,
      extraParams,
    });

    return {
      data,
      pageInfo: {
        nextLink,
      },
    };
  }

  private _getNextLink(data: GetNextLinkPaginator): string | null {
    const { baseUrl, extraParams, limit, endCursor, order, hasNextPage } = data;

    if (!hasNextPage) {
      return null;
    }

    let nextParams = {
      limit,
      after: endCursor.getTime(),
      order,
    } as Record<string, any>;

    if (extraParams) {
      nextParams = {
        ...nextParams,
        ...extraParams,
      };
    }

    const nextLink = `${baseUrl}?${new URLSearchParams(nextParams).toString()}`;

    return nextLink;
  }
}
