import { EOrderPaginator } from '@/common/paginator/etc/types';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryListTransactionsDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value || 10))
  limit: number = 10;

  @IsEnum(EOrderPaginator)
  order: EOrderPaginator = EOrderPaginator.ASC;

  @IsString()
  @IsOptional()
  after?: string;
}
