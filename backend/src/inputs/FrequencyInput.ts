import { Frequency } from '../entities/Frequency'
import { Field, InputType } from 'type-graphql'

@InputType()
export class FrequencyInput implements Partial<Frequency> {
    @Field()
    name: string

    @Field()
    intervalMinutes: number
}
