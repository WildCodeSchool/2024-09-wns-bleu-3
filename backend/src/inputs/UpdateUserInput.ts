import { Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateUserInput {
    @Field(() => String)
    @Length(3, 20, { message: 'Username must be between 3 and 20 characters' })
    username: string
}
