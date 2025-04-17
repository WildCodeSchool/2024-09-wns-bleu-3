import { Frequency } from '../entities/Frequency'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateFrequencyInput implements Partial<Frequency> {
    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    intervalMinutes?: number
}
