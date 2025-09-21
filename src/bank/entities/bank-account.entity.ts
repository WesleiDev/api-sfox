import { BaseEntity } from '@/common/database';
import { Column, Entity } from 'typeorm';

@Entity('bank_account')
export class BankAccountEntity extends BaseEntity {
  @Column({
    type: 'bigint',
    default: 0,
  })
  balance: number;
}
