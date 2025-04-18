// src/entities/ForgotPassword.ts
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class ForgotPassword extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({ type: 'varchar', nullable: false })
    email: string

    @Field(() => String)
    @Column({ type: 'varchar', nullable: false })
    randomCode: string

    @Field(() => Date)
    @Column({ type: 'timestamp', nullable: false })
    expiresAt: Date
}
