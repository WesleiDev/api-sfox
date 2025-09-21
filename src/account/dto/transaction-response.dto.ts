import { EOperationTypeTransaction } from '../etc/types';

export class TransactionResponseDto {
  id: string;
  createdAt: Date;
  operation: EOperationTypeTransaction;
  amount: number;
}
