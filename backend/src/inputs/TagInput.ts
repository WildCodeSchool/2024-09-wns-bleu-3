import { Field, InputType } from 'type-graphql'

@InputType()
export class TagInput {
    @Field()
    name: string

    @Field()
    color: string
}
