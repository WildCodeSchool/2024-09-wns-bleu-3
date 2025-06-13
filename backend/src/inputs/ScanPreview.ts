import { Field, Int, ObjectType } from 'type-graphql'

// GraphQL object type for scan preview (non-persisted scan results)
@ObjectType()
export class ScanPreview {
    @Field(() => String)
    url: string

    @Field(() => Int)
    statusCode: number

    @Field(() => String)
    statusMessage: string

    @Field(() => Int)
    responseTime: number

    @Field(() => String)
    sslCertificate: string

    @Field(() => Boolean)
    isOnline: boolean
}
 