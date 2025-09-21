import { Money } from '@/common/utils/money.utils';
import { AccountResponseDto, TransactionResponseDto } from '../dto';
import { AccountEntity } from '../entities/account.entity';
import { ICreateTransaction, IPerformeOperation } from '../interfaces';
import { TransactionEntity } from '../entities/transaction.entity';

export class AccountMapper {
  static mapAccountResponse(account: AccountEntity): AccountResponseDto {
    return {
      id: account.id,
      accountNumber: account.accountNumber,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      balance: Money.fromCents(account.balance).toDollars(),
    };
  }

  static mapPayloadToCreateTransaction(
    data: IPerformeOperation,
  ): ICreateTransaction {
    return {
      accountId: data.account.id,
      amount: Money.fromDollars(data.amount).toCents(),
      operation: data.type,
    };
  }

  static mapTransactionResponse(
    transaction: TransactionEntity,
  ): TransactionResponseDto {
    return {
      id: transaction.id,
      createdAt: transaction.createdAt,
      operation: transaction.operation,
      amount: Money.fromCents(transaction.amount).toDollars(),
    };
  }
}
