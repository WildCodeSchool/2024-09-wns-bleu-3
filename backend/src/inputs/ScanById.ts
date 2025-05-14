import { Scan } from '../entities/Scan'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class ScanByUserId {
    @Field(() => [Scan])
    scans: Scan[]

    @Field(() => Number)
    totalScans: number

    @Field(() => String, { nullable: true })
    username?: string
}
