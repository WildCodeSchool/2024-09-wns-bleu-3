import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildSchema } from 'type-graphql'
import { dataHealthCheck } from './config/db'
import ScanResolver from './resolver/ScanResolver'

async function start() {
    await dataHealthCheck.initialize()

    const schema = await buildSchema({
        resolvers: [ScanResolver],
    })

    const server = new ApolloServer({
        schema,
    })

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    })

    console.log(`🚀 Server ready at ${url}`)
}

start()
