import { Field, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Scan } from './Scan'

@ObjectType()
@Entity()
export class ScanHistory extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({ type: 'varchar' })
    url: string

    @Field(() => Number)
    @Column({ type: 'int' })
    statusCode: number

    @Field(() => String)
    @Column({ type: 'varchar' })
    statusMessage: string

    @Field(() => Number)
    @Column({ type: 'int' })
    responseTime: number

    @Field(() => String)
    @Column({ type: 'varchar' })
    sslCertificate: string

    @Field(() => Boolean)
    @Column({ type: 'boolean' })
    isOnline: boolean

    @Field(() => Date)
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @Field(() => Scan)
    @ManyToOne(() => Scan, scan => scan.history, { onDelete: 'CASCADE' })
    scan: Scan
}
