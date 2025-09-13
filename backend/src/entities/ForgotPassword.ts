// src/entities/ForgotPassword.ts
import { IsEmail, IsUUID } from 'class-validator'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class ForgotPassword extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @IsEmail({}, { message: 'Email must be valid' })
    @Column({ type: 'varchar', nullable: false })
    email: string

    @Field(() => String)
    @Column({ type: 'varchar', nullable: false })
    @IsUUID('4', { message: 'randomCode must be a UUID v4' })
    randomCode: string

    @Field(() => Date)
    @Column({ type: 'timestamp', nullable: false })
    expiresAt: Date
}
