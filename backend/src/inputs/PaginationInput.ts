import { Field, InputType, Int, ObjectType } from 'type-graphql'
import { ScanByUserId } from './ScanById'

@InputType()
export class PaginationInput {
    @Field(() => Int)
    limit: number

    @Field(() => Int)
    offset: number

    @Field(() => String, { nullable: true })
    search?: string
}

@ObjectType()
export class PaginationOutput extends ScanByUserId {
    @Field(() => Int)
    total: number

    @Field(() => Int)
    page: number

    @Field(() => Int)
    limit: number

    @Field(() => Boolean)
    hasMore: boolean

    @Field(() => Int)
    activeScans: number
}
