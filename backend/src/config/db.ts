import { DataSource } from 'typeorm'

export const dataHealthCheck = new DataSource({
  type: 'postgres',
  host: 'db',
  username: 'postgres',
  database: 'postgres',
  password: 'example',
  entities: [],
  synchronize: true,
  logging: ['error', 'query'],
})
