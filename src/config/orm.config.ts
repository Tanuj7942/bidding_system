import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_NAME ?? 'kgkgroup',
  port: Number(process.env.DB_PORT ?? 5432),
  synchronize: false,
  entities: ['**/entities/*.entity.js'],
  logging: process.env.NODE_ENV !== 'production' ? true : false,
  migrations: ['**/migrations/*.js'],
  subscribers: ['**/subscribers/**/*.js'],
  dropSchema: process.env.DB_DROP_SCHEMA === 'true' ? true : false,
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true' ? true : false,
  extra: {
    connectionLimit: Number(process.env.CONNECTION_LIMIT ?? 10),
  },
});