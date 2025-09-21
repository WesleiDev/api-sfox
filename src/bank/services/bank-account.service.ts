import { Injectable } from '@nestjs/common';
import { BankAccountRepository } from '../repositories/bank-account.repository';
import { BankAccountEntity } from '../entities/bank-account.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class BankAccountService {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}

  @Transactional()
  async increment(amount: number) {
    const bankAccount = await this.findOneOrCreate();
    return this.bankAccountRepository.increment(bankAccount.id, amount);
  }

  @Transactional()
  async decrement(amount: number) {
    const bankAccount = await this.findOneOrCreate();
    return this.bankAccountRepository.decrement(bankAccount.id, amount);
  }

  @Transactional()
  async findOneOrCreate(): Promise<BankAccountEntity> {
    const bankAccount = await this.bankAccountRepository.find({});

    if (bankAccount.length) {
      return bankAccount[0];
    }

    return await this.bankAccountRepository.save({
      balance: 0,
    });
  }
}
