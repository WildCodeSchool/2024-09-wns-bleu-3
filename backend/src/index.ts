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

async function start() {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error('no jwt secret')
    }
    await dataHealthCheck.initialize()

    const schema = await buildSchema({
        resolvers: [ScanResolver, FrequenceResolver, TagResolver, UserResolver],
    })

    const server = new ApolloServer({
        schema,
    })

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req }) => {
            const token = req.headers.authorization?.split('Bearer ')[1]
            if (token !== undefined) {
                const payload = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret)
                console.log('payload in context', payload)
                if (payload) {
                    console.log('payload was found and returned to resolver')
                    return payload
                }
            }
            return {}
        },

    })

    console.log(`🚀 Server ready at ${url}`)
}

start()
