import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Frequency } from './Frequency'
import { Tag } from './Tag'
import { User } from './User'

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
    // nullable true a frequency pour les test, a enlever après
    @Field(() => Frequency)
    @ManyToOne(() => Frequency, frequency => frequency.scans, { nullable: true, eager: true })
    frequency: Frequency | null

    // Relation Many-to-Many avec Tag
    @Field(() => [Tag])
    @ManyToMany(() => Tag, tag => tag.scans, { nullable: true, eager: true })
    @JoinTable()
    tags: Tag[]

    // Relation Many-to-One avec Scan
    @Field(() => User)
    @ManyToOne(() => User, user => user.scans, { nullable: true, onDelete: 'CASCADE', eager: true })
    user: User

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date

    @Field(() => Date, { nullable: true })
    @Column({ type: 'timestamp', nullable: true })
    lastScannedAt: Date | null

    @Field(() => Date, { nullable: true })
    @Column({ type: 'timestamp', nullable: true })
    nextScanAt: Date | null
}
