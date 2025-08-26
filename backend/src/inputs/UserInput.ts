import { IsEmail, MaxLength, MinLength } from 'class-validator'
import { User } from '../entities/User'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UserInput implements Partial<User> {
    @Field(() => String)
    @MinLength(3, { message: 'Username must contain at least 3 characters' })
    @MaxLength(20, { message: 'Username cannot exceed 20 characters' })
    username: string

    @Field(() => String)
    @IsEmail({}, { message: 'Invalid email' })
    email: string

    @Field(() => String)
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string
}
