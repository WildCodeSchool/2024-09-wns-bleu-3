import 'dotenv/config'
import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import { createYoga } from 'graphql-yoga'
import { buildSchema } from 'type-graphql'
import { dataHealthCheck } from './config/db'
import cors from 'cors'
import ScanResolver from './resolver/ScanResolver'
import { maxDepthPlugin } from '@escape.tech/graphql-armor-max-depth';
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
import { authChecker } from './utils/authChecker'
import RoleResolver from './resolver/RoleResolver'

const PORT = 4000

// CORS Configuration
const getCorsOptions = () => {
    const allowedOrigins = [
        // Development origins
        'http://localhost:5173',
        'http://localhost:3030',
        // Production & staging origins
        'https://092024-bleu-3.wns.wilders.dev',
        'https://staging.092024-bleu-3.wns.wilders.dev/',
    ]

    return {
        origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
            // Allow requests with no origin only in development
            if (!origin && process.env.NODE_ENV === 'development') {
                return callback(null, true)
            }

            // Check if origin is in allowed list
            if (origin && allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                console.warn(`CORS blocked request from origin: ${origin}`)
                callback(new Error(`Origin ${origin} not allowed by CORS policy`))
            }
        },
        credentials: true, // Allow cookies to be sent
    }
}

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
            try {
                await seedDatabase()
                console.log('✅ Database seeded successfully')
            }
            catch (error) {
                console.error('❌ Failed to seed database:', error)
            }
        }

        // Build GraphQL schema with TypeGraphQL
        const schema = await buildSchema({
            resolvers: [RoleResolver, ScanResolver, FrequenceResolver, TagResolver, UserResolver, ScanHistoryResolver],
            pubSub,
            authChecker,
        })

        // Setup Express app
        const app = express()

        app.use(cors(getCorsOptions()))

        // Setup Yoga Server
        const yoga = createYoga({
            schema,
            plugins: [
                maxDepthPlugin({ n: 6 }),
            ],
            graphqlEndpoint: '/graphql',
            graphiql: true,
            logging: true,
            context: async ({ request }) => {
                let email: string | undefined
                let id: number | undefined
                let role: string | undefined

                try {
                    const rawCookies = request.headers.get('cookie') || ''
                    const cookies = cookie.parse(rawCookies)

                    if (cookies.token) {
                        const payload = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY as string) as JwtPayload
                        const parsedPayload = ContextSchema.safeParse({ email: payload.email, id: payload.userId, role: payload.role })

                        console.log('Parsed JWT payload:', parsedPayload)

                        if (parsedPayload.success) {
                            email = payload.email
                            id = payload.userId
                            role = payload.role
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
                    id,
                    role,
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
