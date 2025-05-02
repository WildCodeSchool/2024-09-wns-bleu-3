import 'dotenv/config'
import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import { createYoga } from 'graphql-yoga'
import { buildSchema } from 'type-graphql'
import { dataHealthCheck } from './config/db'
import ScanResolver from './resolver/ScanResolver'
import FrequenceResolver from './resolver/FrequenceResolver'
import TagResolver from './resolver/TagResolver'
import UserResolver from './resolver/UserResolver'
import * as cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { JwtPayload } from './@types/payload'
import { ContextSchema } from './schema/context'
import { seedDatabase } from '../scripts/seed'
import { initCronJobs } from './cron'
import { pubSub } from './utils/pubSub'
import ScanHistoryResolver from './resolver/ScanHistoryResolver'

const PORT = 4000

async function start() {
    try {
    // Validate environment
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error('JWT_SECRET_KEY environment variable is required')
        }

        // Initialize database
        await dataHealthCheck.initialize()
        console.log('✅ Database connection established')

        // Seed database in development
        if (process.env.NODE_ENV === 'development') {
            await seedDatabase()
            console.log('✅ Database seeded successfully')
        }

        // Build GraphQL schema with TypeGraphQL
        const schema = await buildSchema({
            resolvers: [ScanResolver, FrequenceResolver, TagResolver, UserResolver, ScanHistoryResolver],
            pubSub,
            // authChecker: ({ context }) => !!context.email,
        })

        // Setup Express app
        const app = express()

        // Setup Yoga Server
        const yoga = createYoga({
            schema,
            graphqlEndpoint: '/graphql',
            graphiql: true,
            logging: true,
            context: async ({ request }) => {
                let email: string | undefined

                try {
                    const rawCookies = request.headers.get('cookie') || ''
                    const cookies = cookie.parse(rawCookies)

                    if (cookies.token) {
                        const payload = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY as string) as JwtPayload
                        const parsedPayload = ContextSchema.safeParse({ email: payload.email })

                        if (parsedPayload.success) {
                            email = payload.email
                        }
                        else {
                            console.error('Invalid JWT payload:', parsedPayload.error)
                        }
                    }
                }
                catch (error) {
                    console.error('Invalid JWT payload:', error)
                }

                return {
                    email,
                }
            },
        })

        app.use(yoga.graphqlEndpoint, yoga)

        // Error Middleware to trace errors
        app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
            console.error('Unhandled error:', err.stack || err)
            res.status(err.status || 500).json({
                error: err.message || 'Internal Server Error',
            })
        })

        // Start server

        app.listen(PORT, () => {
            console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
        })

        // Initialize CRON jobs
        initCronJobs()
        console.log('⏰ CRON jobs initialized')
    }
    catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

start()
