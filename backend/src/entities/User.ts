import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Scan } from './Scan'
import { MinLength } from 'class-validator'
import { Role } from './Role'

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string

    @Field(() => String)
    @MinLength(8)
    @Column({ type: 'varchar', nullable: false })
    password: string

    @Field(() => String)
    @MinLength(4)
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

    @Field(() => Role)
    @ManyToOne(() => Role, role => role.users, { nullable: true, onDelete: 'CASCADE', eager: true })
    role: Role
}
