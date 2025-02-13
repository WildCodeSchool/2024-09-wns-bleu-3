import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Scan extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @Column()
    title: string

    @Column()
    statusCode: number

    @Column()
    statusMessage: string

    @Column()
    responseTime: number

    @Column()
    sslCertificate: boolean

    @Column()
    isOnline: boolean

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}
