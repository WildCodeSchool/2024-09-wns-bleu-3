import { Scan } from '../entities/Scan'
import { Field, InputType } from 'type-graphql'

@InputType()
export class ScanInput implements Partial<Scan> {
    @Field()
    url: string

    @Field()
    title: string
}
