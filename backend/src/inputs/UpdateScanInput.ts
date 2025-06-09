import { Scan } from '../entities/Scan'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class UpdateScanInput implements Partial<Scan> {
    @Field(() => Int)
    id: number

    @Field(() => String, { nullable: true })
    title: string

    @Field(() => [Number], { nullable: true })
    tagIds?: number[]

    @Field(() => Int, { nullable: true })
    frequencyId?: number
}
