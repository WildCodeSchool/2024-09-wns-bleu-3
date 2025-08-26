import { Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class TagInput {
    @Field()
     @Length(1, 20, { message: 'Name must be between 1 and 20 characters' })
    name: string

    @Field()
    color: string

    @Field(() => [Number], { nullable: true })
    tagIds?: number[]
}
