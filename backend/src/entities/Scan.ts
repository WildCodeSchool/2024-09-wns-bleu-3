import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Frequency } from './Frequency'
import { Tag } from './Tag'

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

    // Relation Many-to-One avec Frequency
    @Field(() => Frequency)
    @ManyToOne(() => Frequency, frequency => frequency.scans)
    frequency: Frequency

    // Relation Many-to-Many avec Tag
    @Field(() => [Tag])
    @ManyToMany(() => Tag, tag => tag.scans)
    @JoinTable()
    tags: Tag[]

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date
}
