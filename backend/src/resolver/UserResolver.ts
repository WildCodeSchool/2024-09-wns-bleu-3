import { User } from '../entities/User'
import { UserInput } from '../inputs/UserInput'
import {
    Arg,
    Ctx,
    Mutation,

    Resolver,
} from 'type-graphql'
import * as argon2 from 'argon2'
import jwt, { Secret } from 'jsonwebtoken'
import { UserLoginInput } from '../inputs/UserLoginInput'

@Resolver(() => User)
class UserResolver {
    @Mutation(() => String)
    async register(@Arg('data') newUserData: UserInput) {
        // const randomCode = uuidv4()
        const result = await User.save({
            username: newUserData.username,
            email: newUserData.email,
            password: await argon2.hash(newUserData.password),
        })

        if (!result)
            throw new Error('Error on creating user')

        console.log('result', result)
        return 'user successfully created'
    }

    @Mutation(() => String)
    async login(@Arg('data') loginData: UserLoginInput) {
        let isPasswordCorrect = false
        const user = await User.findOneBy({ email: loginData.email })

        if (user) {
            isPasswordCorrect = await argon2.verify(
                user.password,
                loginData.password,
            )
        }
        // if user identified : generate token
        if (isPasswordCorrect === true && user !== null) {
            const token = jwt.sign(
                { email: user.email },
                process.env.JWT_SECRET_KEY as Secret,
            )
            return token
        }
        else {
            throw new Error('Incorrect login')
        }
    }
}


@Mutation(() => String)
async logout(@Ctx() context: any) {
    context.res.setHeader(
        "Set-Cookie",
        `token=; Secure; HttpOnly;expires=${new Date(Date.now()).toUTCString()}`
    );
    return "logged out";
}

export default UserResolver
