import { Scan } from '../entities/Scan'
import { Field, Int, ObjectType } from 'type-graphql'
import { Issue } from './Issue'

@ObjectType()
export class ScanByUserId {
    @Field(() => [Scan])
    scans: Scan[]

    @Field(() => Int)
    totalScans: number

    @Field(() => String, { nullable: true })
    username?: string

    @Field(() => Int)
    totalIssues: number

    @Field(() => [Issue])
    issues: Issue[]
}
