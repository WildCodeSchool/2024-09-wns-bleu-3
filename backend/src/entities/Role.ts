import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Field(() => [User])
    @OneToMany(() => User, user => user.role)
    users: User[]
}
