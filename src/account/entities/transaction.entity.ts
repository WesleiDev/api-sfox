import { BaseEntity } from '@/common/database';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { EOperationTypeTransaction } from '../etc/types';

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
  @ManyToOne(() => AccountEntity, { nullable: false })
  account: AccountEntity;

  @Column({
    type: 'enum',
    enum: EOperationTypeTransaction,
    nullable: false,
  })
  operation: EOperationTypeTransaction;

  @Column({
    type: 'bigint',
    nullable: false,
  })
  amount: number;
}
