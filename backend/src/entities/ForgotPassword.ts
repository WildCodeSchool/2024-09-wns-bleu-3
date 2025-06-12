// src/entities/ForgotPassword.ts
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail, IsUUID } from 'class-validator'

@ObjectType()
@Entity()
export class ForgotPassword extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @IsEmail({}, { message: 'Invalid email format' })
    @Column({ type: 'varchar', nullable: false })
    email: string

    @Field(() => String)
    @IsUUID('4', { message: 'randomCode must be a UUID v4' })
    @Column({ type: 'varchar', nullable: false })
    randomCode: string

    @Field(() => Date)
    @Column({ type: 'timestamp', nullable: false })
    expiresAt: Date
}
