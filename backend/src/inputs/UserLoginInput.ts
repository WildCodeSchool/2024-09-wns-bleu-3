import { Field, InputType } from 'type-graphql'

@InputType()
export class UserLoginInput {
    @Field(() => String)
    email: string

    @Field(() => String)
    password: string
}

// TODO validatiton des fields du back : minimum requis
