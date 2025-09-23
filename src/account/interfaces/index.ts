import { AccountEntity } from '../entities/account.entity';
import { EOperationTypeTransaction } from '../etc/types';

export interface IPerformeOperation {
  userId: string;
  type: EOperationTypeTransaction;
  amount: number;
  account: AccountEntity;
  description: string;
}

export interface ICreateTransaction {
  accountId: string;
  amount: number;
  operation: EOperationTypeTransaction;
  description: string;
}
