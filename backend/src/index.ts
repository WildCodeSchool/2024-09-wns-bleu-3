import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildSchema } from 'type-graphql'
import { dataHealthCheck } from './config/db'
import ScanResolver from './resolver/ScanResolver'
import FrequenceResolver from './resolver/FrequenceResolver'
import TagResolver from './resolver/TagResolver'
import UserResolver from './resolver/UserResolver'
import jwt, { Secret } from 'jsonwebtoken'
import * as cookie from 'cookie'
import { seedDatabase } from '../scripts/seed'
import { initCronJobs } from './cron'
import { ContextSchema, ContextType } from './schema/context'
import { JwtPayload } from './@types/payload'

async function start() {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error('no jwt secret')
    }
    await dataHealthCheck.initialize()

    if (process.env.NODE_ENV === 'development') {
        await seedDatabase()
    }

    const schema = await buildSchema({
        resolvers: [ScanResolver, FrequenceResolver, TagResolver, UserResolver],
        authChecker: ({ context }) => {
            return !!context.email // Retourne true si l'email existe, sinon false
        },
    })

    const server = new ApolloServer({
        schema,
    })

    /**
     * Initialise CRON
     */

    initCronJobs()

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req, res }): Promise<ContextType> => {
            if (req.headers.cookie) {
                const cookies = cookie.parse(req.headers.cookie as string)
                // console.log('Headers ===> ', req.headers)
                // console.log('Cookies in Headers ===> ', cookies)

                if (cookies.token !== undefined && cookies.token !== '') {
                    try {
                        const payload: JwtPayload = jwt.verify(
                            cookies.token,
                            process.env.JWT_SECRET_KEY as Secret,
                        ) as JwtPayload
                        // Validate the payload using Zod
                        const parsedPayload = ContextSchema.safeParse({ email: payload.email })

                        if (!parsedPayload.success) {
                            console.error('Invalid JWT payload:', parsedPayload.error)
                            return { res }
                        }

                        console.log('payload was found and returned to resolver')
                        return { email: payload.email, res }
                    }
                    catch (error) {
                        console.error('JWT verification failed: ', error)
                    }
                }
            }
            return { res }
        },
    })

    console.log(`🚀 Server ready at ${url}`)
}

start()
