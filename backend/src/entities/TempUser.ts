import { MinLength } from 'class-validator'
import { Field } from 'type-graphql'
import { IsEmail, IsUUID } from 'class-validator'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TempUser extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @MinLength(4)
    @Column({ type: 'varchar', nullable: false })
    username: string

    @Field(() => String)
    @Column({ type: 'varchar', unique: true, nullable: false })
    @IsEmail({}, { message: 'Email must be valid' })
    email: string

    @Field(() => String)
    @Column({ type: 'varchar', nullable: false })
    hashedPassword: string

    @Field(() => String)
    @Column({ type: 'varchar', nullable: false })
    @IsUUID('4', { message: 'randomCode must be a UUID v4' })
    randomCode: string

    @Field(() => Date)
    @Column({ type: 'timestamp', nullable: false })
    expiresAt: Date
}
