import { User } from '../entities/User'
import { UserInput } from '../inputs/UserInput'
import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql'
import * as argon2 from 'argon2'
import jwt, { Secret } from 'jsonwebtoken'
import { UserLoginInput } from '../inputs/UserLoginInput'
import { v4 as uuidv4 } from 'uuid'
import { Resend } from 'resend'
import { ForgotPassword } from '../entities/ForgotPassword'
import { emailHtml } from '../utils/user'
import { UpdateUserInput } from '../inputs/UpdateUserInput'
import { ContextType } from '../schema/context'
import UserInfo from '../inputs/UserInfo'

@Resolver(() => User)
class UserResolver {
    @Query(() => UserInfo, { nullable: true })
    async getUserInfo(@Ctx() context: ContextType): Promise<UserInfo | null> {
        // Extract email from the context
        const { email } = context

        if (!email) {
            return null
        }
        try {
            // Use the email to find the user
            // {email} is sugar syntax for { email: email }
            const user = await User.findOne({ where: { email } })

            if (!user) {
                return null
            }

            return {
                id: user.id,
                isLoggedIn: true,
                email: user.email,
                username: user.username,
            }
        }
        catch (error) {
            console.error('Error fetching user info:', error)
            return null
        }
    }

    @Mutation(() => String)
    async register(@Arg('data') newUserData: UserInput) {
        const isUserExist = await User.findOneBy({ email: newUserData.email });

        if (isUserExist) {
        throw new Error("Un utilisateur avec cet email existe déjà.");
        }
            //validaton du mot de passe
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(newUserData.password)) {
            throw new Error('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)');
        }
        
        // const randomCode = uuidv4()
        const result = await User.save({
            username: newUserData.username,
            email: newUserData.email,
            password: await argon2.hash(newUserData.password),
        })

        if (!result)
            throw new Error('Une erreur est survenue, veuillez réessayer')

        // console.log('result', result)
        return 'user successfully created'
    }

    @Mutation(() => String)
    async updateUser(@Arg('id') id: number, @Arg('data') updateUserData: UpdateUserInput) {
        const userToUpdate = await User.findOne({
            where: { id },
        })
        if (!userToUpdate)
            throw new Error('User non trouvé')

        if (updateUserData.username) {
            const existingUser = await User.findOne({
                where: { username: updateUserData.username },
            })
            if (existingUser && existingUser.id !== id) {
                throw new Error('Un utilisateur avec ce nom existe déjà')
            }
        }

        Object.assign(userToUpdate, updateUserData)
        await User.save(userToUpdate)

        return `L'utilisteur'${id} a bien été mis à jour`
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
            throw new Error('Identifiants incorrects')
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
    async deleteUser(@Arg('id') id: number, @Ctx() context: any) {
        try {
            const user = await User.findOne({ where: { id } })
            if (!user) {
                throw new Error('User not found')
            }

            // utilisateur connecté
            const isCurrentUser = context.email === user.email

            const result = await User.delete(id)

            // clear le cookie si le user était connecté
            if (isCurrentUser) {
                context.res.setHeader('Set-Cookie', `token=; Path=/; Secure; HttpOnly; expires=${new Date(0).toUTCString()}`)
            }

            if (result.affected === 1) {
                return isCurrentUser ? 'Your account has been deleted. You will be logged out.' : 'User has been deleted'
            }
            else {
                throw new Error('User has not been found')
            }
        }
        catch (error) {
            console.error({ 'Error deleting user': error })
            throw new Error('Something went wrong')
        }
    }

    @Mutation(() => String)
    async forgotPassword(@Arg('userEmail') email: string) {
        // search user if exist
        const user = await User.findOneBy({ email })
        // if user not found return false
        if (!user) {
            throw new Error('Email introuvable')
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
                from: 'Sonar <onboarding@resend.dev>',
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
        @Arg('newPassword') newPassword: string,
        @Arg('confirmPassword') confirmPassword: string,
    ) {
        //vérifier si les 2 mots de passe sont identiques
        if (newPassword !== confirmPassword)
            throw new Error("Les mots de passe ne correspondent pas")

        //validation du mot de passe
        
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            throw new Error('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)');
        }

        // vérifier si le code de vérification est correct
        const forgotPasswordUser = await ForgotPassword.findOneBy({ randomCode: code })
        if (!forgotPasswordUser)
            throw new Error('Le code de vérification est incorrect')

        // verifier si le code n'est pas expiré
        const now = new Date()
        const timeDifferenceMinutes = Math.floor(
            (now.getTime() - forgotPasswordUser.expiresAt.getTime()) / (1000 * 60),
        )

        if (timeDifferenceMinutes > 0) {
            throw new Error('Le code de vérification est expiré')
        }
        // chercher l'utilisateur
        const user = await User.findOneByOrFail({ email: forgotPasswordUser.email })
        // modifer le mot de passe de l'utilisateur
        user.password = await argon2.hash(newPassword)
        user.save()
        // supprimer l'utilisateur avec le mot de passe temporaire
        await forgotPasswordUser.remove()
        return 'Le mot de passe a bien été modifié'
    }
}

export default UserResolver
