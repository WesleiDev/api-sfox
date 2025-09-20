import { BaseRepository } from '@/common/database';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  findByMail(mail: string): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: {
        mail,
      },
    });
  }
}
