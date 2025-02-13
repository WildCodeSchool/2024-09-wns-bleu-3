import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Scan } from '../entities/Scan'

export const dataHealthCheck = new DataSource({
    type: 'postgres',
    host: 'db',
    username: 'postgres',
    database: 'postgres',
    password: 'postgres',
    entities: [Scan],
    synchronize: true,
    logging: ['error', 'query'],
    namingStrategy: new SnakeNamingStrategy(),
})
