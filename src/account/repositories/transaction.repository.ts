import { BaseRepository } from '@/common/database';
import { TransactionEntity } from '../entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionRepository extends BaseRepository<TransactionEntity> {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repository: Repository<TransactionEntity>,
  ) {
    super(repository);
  }
}
