import { BaseRepository } from '@/common/database';
import { AccountEntity } from '../entities/account.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountRepository extends BaseRepository<AccountEntity> {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly repository: Repository<AccountEntity>,
  ) {
    super(repository);
  }
}
