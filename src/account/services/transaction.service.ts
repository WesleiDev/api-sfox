import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { ICreateTransaction } from '../interfaces';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  createTransaction(data: ICreateTransaction) {
    const { accountId, operation, amount } = data;
    return this.transactionRepository.save({
      account: {
        id: accountId,
      },
      operation,
      amount,
    });
  }
}
