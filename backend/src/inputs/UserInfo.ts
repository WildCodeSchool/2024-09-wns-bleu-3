import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class UserInfo {
    @Field()
    id: number

    @Field()
    username: string

    @Field()
    isLoggedIn: boolean

    @Field()
    email: string
}

export default UserInfo
