import { User } from '../entities/User'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UserInput implements Partial<User> {
    @Field(() => String)
    username: string

    @Field(() => String)
    email: string

    @Field(() => String)
    password: string
}
