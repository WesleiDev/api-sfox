import { BaseEntity } from '@/common/database';
import { UserEntity } from '@/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum EAccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('accounts')
export class AccountEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { nullable: false })
  user: UserEntity;

  @Column({
    unique: true,
    nullable: false,
  })
  accountNumber: string;

  @Column({
    type: 'bigint',
    default: 0,
  })
  balance: number;

  @Column({
    type: 'enum',
    enum: EAccountStatus,
    default: EAccountStatus.ACTIVE,
  })
  status: EAccountStatus;
}
