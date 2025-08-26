import { IsUrl, Length } from 'class-validator'
import { Scan } from '../entities/Scan'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class ScanInput implements Partial<Scan> {
    @Field(() => String)
    @IsUrl({}, { message: 'Invalid URL format' })
    url: string

    @Field(() => String)
    @Length(1, 30, { message: 'Title must be between 1 and 30 characters' })
    title: string

    @Field(() => [Int], { nullable: true })
    tagIds?: number[]

    @Field(() => Int, { nullable: true })
    frequencyId?: number
}
