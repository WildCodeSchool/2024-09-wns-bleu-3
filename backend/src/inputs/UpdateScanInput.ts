import { Scan } from '../entities/Scan'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateScanInput implements Partial<Scan> {
    @Field()
    id: number

    @Field({ nullable: true })
    title: string

    @Field(() => [Number], { nullable: true })
    tagIds?: number[]
}
