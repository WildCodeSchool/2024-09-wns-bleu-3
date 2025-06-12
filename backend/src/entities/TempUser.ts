import { IsEmail, IsUUID } from 'class-validator'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TempUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @IsEmail({}, { message: 'Email must be valid' })
    @Column()
    email: string

    @Column()
    hashedPassword: string

    @Column()
    @IsUUID('4', { message: 'randomCode must be a UUID v4' })
    randomCode: string
}
