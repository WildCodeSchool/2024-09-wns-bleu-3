import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Scan } from './Scan'
import { MinLength } from 'class-validator'

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ unique: true, nullable: false })
    email: string

    @Field()
    @MinLength(8)
    @Column({ nullable: false })
    password: string

    @Field()
    @MinLength(5)
    @Column({ nullable: false })
    username: string

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date

    // Relation One-to-Many avec scan
    @Field(() => [Scan])
    @OneToMany(() => Scan, scan => scan.user)
    scans: Scan[]
}
