// src/inputs/UserInfo.ts
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class UserInfo {
    @Field(() => Number)
    id: number

    @Field(() => String)
    username: string

    @Field(() => Boolean)
    isLoggedIn: boolean

    @Field(() => String)
    email: string
}

export default UserInfo
