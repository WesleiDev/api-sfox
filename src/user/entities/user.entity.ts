import { BaseEntity } from '@/common/database';
import { Column, Entity, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AccountEntity } from '@/account/entities/account.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({
    length: 100,
  })
  firstName: string;

  @Column({
    length: 100,
  })
  lastName: string;

  @Column({ unique: true })
  mail: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToOne(() => AccountEntity, (account) => account.user)
  account: AccountEntity;
}
