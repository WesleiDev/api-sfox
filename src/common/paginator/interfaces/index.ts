import { EOrderPaginator } from '../etc/types';

export interface CursorPaginationParams {
  limit?: number;
  after?: string | number;
  order?: EOrderPaginator;
  baseUrl: string;
  extraParams?: Record<string, any>;
  alias: string;
}

export interface CursorPaginationResult<T> {
  data: T[];
  pageInfo: {
    nextLink: string | null;
  };
}

export interface GetNextLinkPaginator {
  hasNextPage: boolean;
  limit: number;
  order: EOrderPaginator;
  endCursor: Date;
  baseUrl: string;
  extraParams?: Record<string, any>;
}
