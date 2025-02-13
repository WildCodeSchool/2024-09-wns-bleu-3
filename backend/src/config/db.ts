import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Scan } from '../entities/Scan'

console.log('Postgres Config:', { host: process.env.POSTGRES_HOST, user: process.env.POSTGRES_USER, database: process.env.POSTGRES_DB, password: process.env.POSTGRES_PASSWORD })

export const dataHealthCheck = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    entities: [Scan],
    synchronize: true,
    logging: ['error', 'query'],
    namingStrategy: new SnakeNamingStrategy(),
})
