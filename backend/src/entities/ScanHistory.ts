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
import { IsString, IsUrl, Length, Max, Min } from 'class-validator'

@ObjectType()
@Entity()
export class ScanHistory extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @IsUrl({}, { message: 'Invalid URL format' })
    @Column({ type: 'varchar' })
    url: string

    @Field(() => Number)
    @Min(100, { message: 'Invalid HTTP status code' })
    @Max(599, { message: 'Invalid HTTP status code' })
    @Column({ type: 'int' })
    statusCode: number

    @Field(() => String)
    @Length(1, 50, { message: 'Status message must not be empty' })
    @Column({ type: 'varchar' })
    statusMessage: string

    @Field(() => Number)
    @Min(0, { message: 'Response time must be non-negative' })
    @Column({ type: 'int' })
    responseTime: number

    @Field(() => String)
    @IsString({ message: 'SSL Certificate must be a string' })
    @Length(1, 100, { message: 'SSL Certificate must not be empty' })
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
