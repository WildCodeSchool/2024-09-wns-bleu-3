import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Frequency } from './Frequency'
import { Tag } from './Tag'
import { User } from './User'
import { ScanHistory } from './ScanHistory'
import { IsString, IsUrl, Length, Max, Min } from 'class-validator'

@ObjectType()
@Entity()
export class Scan extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @IsUrl({}, { message: 'Invalid URL format' })
    @Column({ type: 'varchar' })
    url: string

    @Field(() => String)
    @Length(1, 30, { message: 'Title must be between 1 and 30 characters' })
    @Column({ type: 'varchar' })
    title: string

    @Field(() => Number)
    @Min(100, { message: 'Status code must be at least 100' })
    @Max(599, { message: 'Status code must be at most 599' })
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
