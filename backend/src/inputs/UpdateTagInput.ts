import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateTagInput {
    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    color?: string
}
