import 'dotenv/config';
import express, { NextFunction, Response, Request } from 'express';
import { createYoga } from 'graphql-yoga';
import { buildSchema } from 'type-graphql';
import { dataHealthCheck } from './config/db';
import ScanResolver from './resolver/ScanResolver';
import FrequenceResolver from './resolver/FrequenceResolver';
import TagResolver from './resolver/TagResolver';
import UserResolver from './resolver/UserResolver';
// import jwt, { Secret } from 'jsonwebtoken';
// import * as cookie from 'cookie';
import { seedDatabase } from '../scripts/seed';
import { initCronJobs } from './cron';
// import { ContextSchema, ContextType } from './schema/context';
// import { JwtPayload } from './@types/payload';

const PORT = 4000;
// const API_PATH = '/';

// async function verifyToken(cookieStr: string): Promise<ContextType> {
//   const cookies = cookie.parse(cookieStr);
  
//   if (!cookies.token) {
//     return { };
//   }
  
//   try {
//     const payload: JwtPayload = jwt.verify(
//       cookies.token,
//       process.env.JWT_SECRET_KEY as Secret
//     ) as JwtPayload;
    
//     // Validate payload using Zod
//     const parsedPayload = ContextSchema.safeParse({ email: payload.email });
    
//     if (!parsedPayload.success) {
//       console.error('Invalid JWT payload:', parsedPayload.error);
//       return { };
//     }
    
//     return { email: payload.email };
//   } catch (error) {
//     console.error('JWT verification failed:', error);
//     return { };
//   }
// }

// async function createContext({ req, res }: { req: express.Request, res: express.Response }): Promise<ContextType> {
//   const context: ContextType = { res };
  
//   if (req.headers.cookie) {
//     const {email} = await verifyToken(req.headers.cookie as string);
//     if (email) context.email = email;
//   }
  
//   return context;
// }

async function start() {
  try {
    // Validate environment
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error('JWT_SECRET_KEY environment variable is required');
    }
    
    // Initialize database
    await dataHealthCheck.initialize();
    console.log('✅ Database connection established');
    
    // Seed database in development
    if (process.env.NODE_ENV === 'development') {
      await seedDatabase();
      console.log('✅ Database seeded successfully');
    }
    
    // Build GraphQL schema with TypeGraphQL
    const schema = await buildSchema({
      resolvers: [ScanResolver, FrequenceResolver, TagResolver, UserResolver],
      // authChecker: ({ context }) => !!context.email,
    });
    
    // Setup Express app
    const app = express();

    // Setup Yoga Server
    const yoga = createYoga({
      schema,
      graphqlEndpoint: '/graphql',
      graphiql: true,
    })

    app.use(yoga.graphqlEndpoint, yoga);

    // Error Middleware to trace errors
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      console.error('Unhandled error:', err.stack || err);
      res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
      });
    });

    // Start server

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    })
    
    // Initialize CRON jobs
    initCronJobs();
    console.log('⏰ CRON jobs initialized');
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();