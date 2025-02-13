import { Scan } from '../entities/Scan'
import { Field, InputType } from 'type-graphql'

@InputType()
export class ScanInput implements Partial<Scan> {
    @Field()
    url: string

    @Field()
    title: string

    @Field()
    statusCode: number

    @Field()
    statusMessage: string

    @Field()
    responseTime: number

    @Field()
    sslCertificate: string

    @Field()
    isOnline: boolean
}
