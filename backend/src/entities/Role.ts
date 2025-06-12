import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class Role extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({ type: 'varchar', unique: true, nullable: true })
    name: string

    @Field(() => Date)
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @Field(() => [User], { nullable: true })
    @OneToMany(() => User, user => user.role)
    users: User[]
}
