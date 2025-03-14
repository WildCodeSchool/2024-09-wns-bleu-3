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
import { v4 as uuidv4 } from 'uuid'
import { Resend } from 'resend'
import { ForgotPassword } from '../entities/ForgotPassword'
import { emailHtml } from '../utils/user'

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
    async login(@Arg('data') loginData: UserLoginInput, @Ctx() context: any) {
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
            context.res.setHeader('Set-Cookie', `token=${token}; Secure; HttpOnly`)

            return 'login ok'
        }
        else {
            throw new Error('Incorrect login')
        }
    }

    @Mutation(() => String)
    async logout(@Ctx() context: any) {
        context.res.setHeader(
            'Set-Cookie',
            `token=; Secure; HttpOnly;expires=${new Date(Date.now()).toUTCString()}`,
        )
        return 'logged out'
    }

    @Mutation(() => String)
    async forgotPassword(@Arg('userEmail') email: string) {
        // search user if exist
        const user = await User.findOneBy({ email })
        // if user not found return false
        if (!user) {
            throw new Error('Identifiants incorrects')
        }

        // save user FORGETPASSWORD in db
        const randomCode = uuidv4()
        const expiresAt = new Date()
        expiresAt.setMinutes(expiresAt.getMinutes() + 10) // expire dans 10 minutes
        await ForgotPassword.save({ email, randomCode, expiresAt })

        // Vérifie si RESEND_API_KEY est défini
        if (!process.env.RESEND_API_KEY) {
            throw new Error('RESEND_API_KEY is missing in the .env file')
        }
        const resend = new Resend(process.env.RESEND_API_KEY)

        try {
            const { data, error } = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: [user.email],
                subject: 'Réinitialisation mot de passe',
                html: emailHtml(randomCode),
            })

            if (error) {
                console.error('Email sending failed:', error)
                throw new Error('L\'envoie du mail a échoué')
            }
            console.log({ data })
        }
        catch (err) {
            console.error('Unexpected error:', err)
            throw new Error('Erreur rencontrée dans la tentative d\'envoie du mail')
        }
        return 'OK'
    }

    @Mutation(() => String)
    async changePassword(
        @Arg('code') code: string,
        @Arg('password') password: string,
    ) {
        // vérifier si le code de l'utilisateur est correct
        const forgotPasswordUser = await ForgotPassword.findOneBy({ randomCode: code })
        if (!forgotPasswordUser)
            throw new Error('Le code de confirmation est incorrect')

        // verifier si le code n'est pas expiré
        const now = new Date()
        const timeDifferenceMinutes = Math.floor(
            (now.getTime() - forgotPasswordUser.expiresAt.getTime()) / (1000 * 60),
        )

        if (timeDifferenceMinutes > 0) {
            throw new Error('Le code est expiré')
        }

        // chercher l'utilisateur
        const user = await User.findOneByOrFail({ email: forgotPasswordUser.email })
        // modifer le mot de passe de l'utilisateur
        user.password = await argon2.hash(password)
        user.save()
        // supprimer l'utilisateur avec le mot de passe temporaire
        await forgotPasswordUser.remove()
        return 'Le mot de passe a bien été modifié'
    }
}

export default UserResolver
