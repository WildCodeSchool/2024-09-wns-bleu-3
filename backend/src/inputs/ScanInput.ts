import { Scan } from '../entities/Scan'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class ScanInput implements Partial<Scan> {
    @Field(() => String)
    url: string

    @Field(() => String)
    title: string

    @Field(() => [Int], { nullable: true })
    tagIds?: number[]

    @Field(() => Int, { nullable: true })
    frequencyId?: number
}
