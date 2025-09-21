import { AppConfigModule } from '../src/config/config.module';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
  runInTransaction,
} from 'typeorm-transactional';

export class TestUtils {
  static runInSandbox(cb: (...args: any[]) => any) {
    return async (...args: any[]): Promise<any> => {
      try {
        return await runInTransaction(async () => {
          const result = await cb(...args);
          const err = new Error('FORCE_ROLLBACK_ERROR');
          (err as any).result = result;
          throw err;
        });
      } catch (err) {
        if ((err as Error).message === 'FORCE_ROLLBACK_ERROR') {
          return err.result;
        }
        throw err;
      }
    };
  }

  static async getTestingModule(modules: any[] = [], providers: any[] = []) {
    try {
      initializeTransactionalContext();

      const testingModule = await Test.createTestingModule({
        imports: [
          AppConfigModule.forRoot(),
          TypeOrmModule.forRootAsync({
            imports: [AppConfigModule.forRoot()],
            inject: [ConfigService],
            useFactory() {
              return {
                type: 'mysql',
                host: 'localhost',
                port: 3320,
                username: 'user-api-sfox',
                password: 'password-sfox',
                database: 'e2e-test-api-sfox',
                entities: [join(__dirname, '../src/**/*.entity.{ts,js}')],
                synchronize: true,
                autoLoadEntities: true,
                logging: false,
                name: 'e2e',
                dropSchema: true,
              };
            },
            dataSourceFactory(options) {
              if (!options) {
                throw new Error('Invalid options passed');
              }

              const dataSource = new DataSource(options);
              //Save the datasource to be used in local tests

              return Promise.resolve(addTransactionalDataSource(dataSource));
            },
          }),
          ...modules,
        ],
        providers,
      }).compile();

      const app = testingModule.createNestApplication();
      await app.init();

      return { module: testingModule, app };
    } catch (e) {
      throw new Error(`Error creating test module: ${e.message}`);
    }
  }

  static async getTestingApp(modules: any[]) {
    try {
      const result = await this.getTestingModule(modules);
      return result.app;
    } catch (error) {
      throw new Error(`Error getting test module: ${error.message}`);
    }
  }
}
