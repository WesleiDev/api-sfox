import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'database',
  port: parseInt(process.env.DATABASE_PORT as string, 10) || 3306,
  username: process.env.DATABASE_USER || 'user-api-sfox',
  password: process.env.DATABASE_PASSWORD || 'password-sfox',
  database: process.env.DATABASE_NAME || 'test-api-sfox',
  entities: [join(__dirname, '..', '**', '*.entity.{js,ts}')],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
  synchronize: true,
  autoLoadEntities: true,
  migrationsRun: process.env.NODE_ENV === 'production',
  logging: false,
} as DataSourceOptions);
