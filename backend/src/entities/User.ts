import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Scan } from './Scan'
import { MinLength, IsEmail, MaxLength } from 'class-validator'

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @IsEmail({}, { message: 'Invalid email address' })
    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string

    @Field(() => String)
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(100, { message: 'Password must be less than 100 characters' })
    @Column({ type: 'varchar', nullable: false })
    password: string

    @Field(() => String)
    @MinLength(4, { message: 'Username must be at least 4 characters long' })
    @MaxLength(30, { message: 'Username must be less than 30 characters' })
    @Column({ type: 'varchar', nullable: false })
    username: string

    @Field(() => Date)
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @Field(() => Date)
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date

    // Relation One-to-Many avec scan
    @Field(() => [Scan])
    @OneToMany(() => Scan, scan => scan.user)
    scans: Scan[]
}
