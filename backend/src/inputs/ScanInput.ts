import { Scan } from '../entities/Scan'
import { Field, InputType } from 'type-graphql'

@InputType()
export class ScanInput implements Partial<Scan> {
    @Field()
    url: string

    @Field()
    title: string

    @Field(() => [Number], { nullable: true })
    tagIds?: number[]

    @Field(() => Number, { nullable: true })
    frequencyId?: number
}
