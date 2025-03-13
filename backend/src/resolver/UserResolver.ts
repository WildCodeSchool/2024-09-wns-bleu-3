import { User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";
import {
    Arg,

    Mutation,

    Resolver,
} from "type-graphql";
import * as argon2 from "argon2";



@Resolver(() => User)
class UserResolver {
    @Mutation(() => String)
    async register(@Arg("data") newUserData: UserInput) {
        // const randomCode = uuidv4()
        const result = await User.save({
        username: newUserData.username,
        email: newUserData.email,
        password:  await argon2.hash(newUserData.password)
        })

        if(!result) throw new Error('Error on creating user')
        
        console.log("result", result);
        return "user successfully created"
}}

export default UserResolver