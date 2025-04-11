import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateUserInput {
    @Field(() => String)
    username: string
}
