import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Issue {
    @Field(() => String)
    id: string

    @Field(() => Int)
    scanId: number

    @Field(() => String)
    issueType: string

    @Field(() => String)
    issue: string
}
