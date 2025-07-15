import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Scan } from '../entities/Scan'
import { Frequency } from '../entities/Frequency'
import { Tag } from '../entities/Tag'
import { User } from '../entities/User'
import { ForgotPassword } from '../entities/ForgotPassword'
import { ScanHistory } from '../entities/ScanHistory'
import { Role } from '../entities/Role'

export const dataHealthCheck = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    entities: [Scan, Tag, Frequency, User, ForgotPassword, ScanHistory, Role],
    synchronize: true,
    logging: ['error', 'query'],
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ['src/migrations/*.ts'],
})
