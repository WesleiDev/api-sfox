import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { ICreateTransaction } from '../interfaces';
import { QueryListTransactionsDto } from '../dto';
import { PaginatorService } from '@/common/paginator/services/paginator.service';
import { AccountMapper } from '../mapprs';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly paginatorService: PaginatorService,
  ) {}

  createTransaction(data: ICreateTransaction) {
    const { accountId, ...rest } = data;
    return this.transactionRepository.save({
      account: {
        id: accountId,
      },
      ...rest,
    });
  }

  async list(userId: string, query: QueryListTransactionsDto) {
    const queryBuilder = this.transactionRepository
      .createQueryBuilder('transaction')
      .innerJoinAndSelect('transaction.account', 'account')
      .where('account.userId =:userId', { userId });

    const paginatedItems = await this.paginatorService.paginate(queryBuilder, {
      baseUrl: '/account/transactions',
      limit: query.limit,
      order: query.order,
      alias: 'transaction',
      after: query.after,
    });

    return {
      ...paginatedItems,
      data: paginatedItems.data.map((item) =>
        AccountMapper.mapTransactionResponse(item),
      ),
    };
  }
}
