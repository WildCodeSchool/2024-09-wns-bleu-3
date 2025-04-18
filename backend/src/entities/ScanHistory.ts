import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Scan } from './Scan'

@ObjectType()
@Entity()
export class ScanHistory extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    url: string

    @Field()
    @Column()
    statusCode: number

    @Field()
    @Column()
    statusMessage: string

    @Field()
    @Column()
    responseTime: number

    @Field()
    @Column()
    sslCertificate: string

    @Field()
    @Column()
    isOnline: boolean

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field(() => Scan)
    @ManyToOne(() => Scan, scan => scan.history, { onDelete: 'CASCADE' })
    scan: Scan
}
