import { Scan } from '../entities/Scan'
import { Field, Int, ObjectType } from 'type-graphql'
import { Issue } from './Issue'

@ObjectType()
export class ScanByUserId {
    @Field(() => [Scan])
    scans: Scan[]

    @Field(() => Int)
    totalScans: number

    @Field(() => Int)
    totalIssues: number

    @Field(() => [Issue])
    issues: Issue[]
}
