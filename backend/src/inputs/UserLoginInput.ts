import { IsEmail, MinLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UserLoginInput {
    @Field(() => String)
    @IsEmail({}, { message: 'Invalid email' })
    email: string

    @Field(() => String)
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string
}
