import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Scan extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    url: string

    @Field()
    @Column()
    title: string

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

    @Field()
    @UpdateDateColumn()
    updatedAt: Date
}
