import { User } from '../entities/User'
import { UserInput } from '../inputs/UserInput'
import {
    Arg,
    Authorized,
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
import { isPasswordValid } from '../utils/isPasswordValid'
import { Role } from '../entities/Role'

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
    async register(@Arg('data', () => UserInput) newUserData: UserInput) {
        const isUserExist = await User.findOneBy({ email: newUserData.email })

        // Check if user already exists
        if (isUserExist) {
            throw new Error('An account with this email already exists.')
        }

        let roleUser = await Role.findOneBy({ name: 'User' })

        if (!roleUser) {
            throw new Error('Default role not found')
        }

        // Validate password strength
        isPasswordValid(newUserData.password)

        const result = await User.save({
            username: newUserData.username,
            email: newUserData.email,
            password: await argon2.hash(newUserData.password),
            role: roleUser,
        })

        if (!result) {
            throw new Error('An error occurred, please try again.')
        }

        return 'User successfully created'
    }

    @Authorized('Admin', 'User')
    @Mutation(() => String)
    async updateUser(@Arg('id', () => Number) id: number, @Arg('data', () => UpdateUserInput) updateUserData: UpdateUserInput) {
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
    async login(@Arg('data', () => UserLoginInput) loginData: UserLoginInput, @Ctx() context: any) {
        let isPasswordCorrect = false
        // 1.recherche du user
        const user = await User.findOne({
            where: { email: loginData.email },
            relations: ['role'],
        })

        // 2. vérification du mot de pass haché stocké en base avec argon
        if (user) {
            isPasswordCorrect = await argon2.verify(
                user.password,
                loginData.password,
            )
        }
        // 3. si le urser exist, le mot depasse correct, génération du JWT pis envoie dans un cookie sécurisé
        if (isPasswordCorrect === true && user !== null) {
            const token = jwt.sign(
                { email: user.email, userId: user.id, role: user.role.name },
                process.env.JWT_SECRET_KEY as Secret,
                { expiresIn: '1h' },
            )
            context.res.setHeader(
                'Set-Cookie',
                `token=${token}; HttpOnly; Path=/; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
            )

            return token
        }
        else { // 4. refuser l'accès sans donner trop de détails sur l'information manquante
            throw new Error('Identifiants incorrects')
        }
    }

    @Mutation(() => String)
    async logout(@Ctx() context: any) {
        context.res.setHeader(
            'Set-Cookie',
            `token=; Path=/; HttpOnly; SameSite=Lax; expires=${new Date(0).toUTCString()}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
        )
        return 'logged out'
    }

    @Authorized('Admin', 'User')
    @Mutation(() => String)
    async deleteUser(@Arg('id', () => Number) id: number, @Ctx() context: any) {
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
                context.res.setHeader(
                    'Set-Cookie',
                    `token=; Path=/; HttpOnly; SameSite=Lax; expires=${new Date(0).toUTCString()}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
                )
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
    async forgotPassword(@Arg('userEmail', () => String) email: string) {
        // Check if user exists
        const user = await User.findOneBy({ email })
        if (!user) {
            throw new Error('Email not found.')
        }

        // Generate verification code and expiry
        const randomCode = uuidv4()
        const expiresAt = new Date()
        expiresAt.setMinutes(expiresAt.getMinutes() + 10)

        await ForgotPassword.save({ email, randomCode, expiresAt })

        // Check if email service API key is set
        if (!process.env.RESEND_API_KEY) {
            throw new Error('RESEND_API_KEY is missing in the environment variables.')
        }

        const resend = new Resend(process.env.RESEND_API_KEY)

        try {
            const { data, error } = await resend.emails.send({
                from: 'Sonar <no-reply@sonar.ovh>',
                to: [user.email],
                subject: 'Password Reset Request',
                html: emailHtml(randomCode),
            })

            if (error) {
                console.error('Email sending failed:', error)
                throw new Error('Failed to send verification email.')
            }

            console.log({ data })
        }
        catch (err) {
            console.error('Unexpected error:', err)
            throw new Error('An error occurred while sending the email.')
        }

        return 'Verification code sent successfully.'
    }

    @Mutation(() => String)
    async changePassword(
        @Arg('code', () => String) code: string,
        @Arg('newPassword', () => String) newPassword: string,
        @Arg('confirmPassword', () => String) confirmPassword: string,
    ) {
        // Check if passwords match
        if (newPassword !== confirmPassword) {
            throw new Error('Passwords do not match.')
        }

        // Validate password strength
        isPasswordValid(newPassword)

        // Check if the verification code is valid
        const forgotPasswordUser = await ForgotPassword.findOneBy({ randomCode: code })
        if (!forgotPasswordUser) {
            throw new Error('Invalid verification code.')
        }

        // Check if the verification code has expired
        const now = new Date()
        const timeDifferenceMinutes = Math.floor(
            (now.getTime() - forgotPasswordUser.expiresAt.getTime()) / (1000 * 60),
        )

        if (timeDifferenceMinutes > 0) {
            throw new Error('Verification code has expired.')
        }

        // Retrieve the user by email
        const user = await User.findOneByOrFail({ email: forgotPasswordUser.email })

        // Update the user's password
        user.password = await argon2.hash(newPassword)
        await user.save()

        // Remove the temporary reset code
        await forgotPasswordUser.remove()

        return 'Password has been successfully updated.'
    }
}

export default UserResolver
