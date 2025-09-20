import { DeepPartial, Repository, SaveOptions } from 'typeorm';
import { BaseEntity } from './base-entity';

export class BaseRepository<Entity extends BaseEntity> {
  protected repo: Repository<Entity>;

  constructor(repository: Repository<Entity>) {
    this.repo = repository;
  }

  save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
  ): Promise<T & Entity> {
    return this.repo.save(entity, options);
  }
}
