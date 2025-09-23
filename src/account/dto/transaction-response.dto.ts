import { ApiProperty } from '@nestjs/swagger';
import { EOperationTypeTransaction } from '../etc/types';

export class TransactionResponseDto {
  @ApiProperty({
    description: 'The identification about this transaction',
  })
  id: string;

  @ApiProperty({
    description: 'When this transaction was created',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The type of transaction',
    enum: EOperationTypeTransaction,
  })
  operation: EOperationTypeTransaction;

  @ApiProperty({
    description: 'The amount in decimals',
  })
  amount: number;

  @ApiProperty({
    description: 'The description about this transaction',
  })
  description: string;
}
