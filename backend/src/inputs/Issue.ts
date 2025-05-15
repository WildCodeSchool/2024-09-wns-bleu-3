import { ObjectType, Field, Int } from "type-graphql"

@ObjectType()
export class Issue {
  @Field(() => Int)
  scanId: number

  @Field()
  issueType: string

  @Field()
  issue: string
}