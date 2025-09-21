import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { AccountService } from './services/account.service';
import { AccountRepository } from './repositories/account.repository';
import { AccountController } from './controllers/account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [AccountService, AccountRepository],
  controllers: [AccountController],
})
export class AccountModule {}
