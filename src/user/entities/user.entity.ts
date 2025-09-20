import { BaseEntity } from '@/common/database';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

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
}
