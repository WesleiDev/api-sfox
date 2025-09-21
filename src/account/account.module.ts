import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { AccountService } from './services/account.service';
import { AccountRepository } from './repositories/account.repository';
import { AccountController } from './controllers/account.controller';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionService } from './services/transaction.service';
import { BankModule } from '@/bank/bank.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, TransactionEntity]),
    BankModule,
  ],
  providers: [
    AccountService,
    TransactionService,
    AccountRepository,
    TransactionRepository,
  ],
  controllers: [AccountController],
})
export class AccountModule {}
