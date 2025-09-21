import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountEntity } from './entities/bank-account.entity';
import { BankAccountService } from './services/bank-account.service';
import { BankAccountRepository } from './repositories/bank-account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccountEntity])],
  providers: [BankAccountService, BankAccountRepository],
  exports: [BankAccountService],
})
export class BankModule {}
