import { Field, InputType } from 'type-graphql'

@InputType()
export class UserLoginInput {
    @Field()
    email: string

    @Field()
    password: string
}

// TODO validatiton des fields du back : minimum requis
