import { User } from '../entities/User'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UserLoginInput implements Partial<User> {
    @Field()
    email: string

    @Field()
    password: string
}

// TODO validatiton des fields du back : minimum requis
