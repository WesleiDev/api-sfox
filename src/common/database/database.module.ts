import { AppDataSource } from '@/config/database.config';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
          dataSourceFactory: async () => {
            if (!AppDataSource.isInitialized) {
              await AppDataSource.initialize();
            }
            return addTransactionalDataSource(AppDataSource);
          },
          useFactory: () => ({}),
        }),
      ],
    };
  }
}
