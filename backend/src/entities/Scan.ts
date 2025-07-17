import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Frequency } from './Frequency'
import { Tag } from './Tag'
import { User } from './User'
import { ScanHistory } from './ScanHistory'

@ObjectType()
@Entity()
export class Scan extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({ type: 'varchar' })
    url: string

    @Field(() => String)
    @Column({ type: 'varchar' })
    title: string

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

    @Field(() => Boolean)
    @Column({ type: 'boolean', default: false })
    isPause: boolean

    @Field(() => Boolean)
    @Column({ type: 'boolean', default: false })
    isFavorite: boolean

    // Relation Many-to-One avec Frequency
    // Frequency is required - every scan must have a frequency
    @Field(() => Frequency)
    @ManyToOne(() => Frequency, frequency => frequency.scans, { nullable: false, eager: true })
    frequency: Frequency

    // Relation Many-to-Many avec Tag
    @Field(() => [Tag])
    @ManyToMany(() => Tag, tag => tag.scans, { nullable: true, eager: true })
    @JoinTable()
    tags: Tag[]

    @Field(() => [ScanHistory])
    @OneToMany(() => ScanHistory, history => history.scan)
    history: [ScanHistory]

    // Relation Many-to-One avec Scan
    @Field(() => User)
    @ManyToOne(() => User, user => user.scans, { nullable: true, onDelete: 'CASCADE', eager: true })
    user: User

    @Field(() => Date)
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date

    @Field(() => Date, { nullable: true })
    @Column({ type: 'timestamp', nullable: true })
    lastScannedAt: Date | null

    @Field(() => Date, { nullable: true })
    @Column({ type: 'timestamp', nullable: true })
    nextScanAt: Date | null
}
