import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Scan } from '../entities/Scan'
import { Frequency } from '../entities/Frequency'
import { Tag } from '../entities/Tag'
import { User } from '../entities/User'

export const dataHealthCheck = new DataSource({
    type: 'postgres',
    host: 'db',
    username: 'postgres',
    database: 'postgres',
    password: 'postgres',
    entities: [Scan, Tag, Frequency, User],
    synchronize: true,
    logging: ['error', 'query'],
    namingStrategy: new SnakeNamingStrategy(),
})
