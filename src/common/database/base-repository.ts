import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectId,
  QueryRunner,
  Repository,
  SaveOptions,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

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

  find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repo.find(options);
  }

  findOne(options: FindOneOptions<Entity>): Promise<Entity | null> {
    return this.repo.findOne(options);
  }

  update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>
      | FindOptionsWhere<Entity>[],
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    return this.repo.update(criteria, partialEntity);
  }

  createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<Entity> {
    return this.repo.createQueryBuilder(alias, queryRunner);
  }
}
