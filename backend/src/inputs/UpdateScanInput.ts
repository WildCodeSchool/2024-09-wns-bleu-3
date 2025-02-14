import { Scan } from '../entities/Scan'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateScanInput implements Partial<Scan> {
    @Field()
    id: number

    @Field()
    url: string

    @Field({ nullable: true })
    title: string

    @Field({ nullable: true })
    statusCode: number

    @Field({ nullable: true })
    statusMessage: string

    @Field({ nullable: true })
    responseTime: number

    @Field({ nullable: true })
    sslCertificate: string

    @Field({ nullable: true })
    isOnline: boolean
}
