import { BaseRepository } from '@/common/database';
import { BankAccountEntity } from '../entities/bank-account.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Money } from '@/common/utils/money.utils';

@Injectable()
export class BankAccountRepository extends BaseRepository<BankAccountEntity> {
  constructor(
    @InjectRepository(BankAccountEntity)
    private readonly repository: Repository<BankAccountEntity>,
  ) {
    super(repository);
  }

  decrement(id: string, amount: number) {
    return this.repo
      .createQueryBuilder('bankAccount')
      .update()
      .set({
        balance: () => `balance - :amount`,
      })
      .where('id =:id', { id })
      .setParameters({
        amount: Money.fromDollars(amount).toCents(),
      })
      .execute();
  }

  increment(id: string, amount: number) {
    return this.repo
      .createQueryBuilder('bankAccount')
      .update()
      .set({
        balance: () => `balance + :amount`,
      })
      .where('id =:id', { id })
      .setParameters({
        amount: Money.fromDollars(amount).toCents(),
      })
      .execute();
  }
}
