import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import cors from 'cors';
import express, { NextFunction, Response, Request } from 'express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';
import { buildSchema } from 'type-graphql';
import { dataHealthCheck } from './config/db';
import ScanResolver from './resolver/ScanResolver';
import FrequenceResolver from './resolver/FrequenceResolver';
import TagResolver from './resolver/TagResolver';
import UserResolver from './resolver/UserResolver';
import jwt, { Secret } from 'jsonwebtoken';
import * as cookie from 'cookie';
import { seedDatabase } from '../scripts/seed';
import { initCronJobs } from './cron';
import { ContextSchema, ContextType } from './schema/context';
import { JwtPayload } from './@types/payload';

const PORT = 4000;
const API_PATH = '/';
const SUBSCRIPTIONS_PATH = '/subscriptions';

async function verifyToken(cookieStr: string): Promise<ContextType> {
  const cookies = cookie.parse(cookieStr);
  
  if (!cookies.token) {
    return { };
  }
  
  try {
    const payload: JwtPayload = jwt.verify(
      cookies.token,
      process.env.JWT_SECRET_KEY as Secret
    ) as JwtPayload;
    
    // Validate payload using Zod
    const parsedPayload = ContextSchema.safeParse({ email: payload.email });
    
    if (!parsedPayload.success) {
      console.error('Invalid JWT payload:', parsedPayload.error);
      return { };
    }
    
    return { email: payload.email };
  } catch (error) {
    console.error('JWT verification failed:', error);
    return { };
  }
}

async function createContext({ req, res }: { req: express.Request, res: express.Response }): Promise<ContextType> {
  const context: ContextType = { res };
  
  if (req.headers.cookie) {
    const {email} = await verifyToken(req.headers.cookie as string);
    if (email) context.email = email;
  }
  
  return context;
}

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
      authChecker: ({ context }) => !!context.email,
    });
    
    // Setup Express app and HTTP server
    const app = express();
    const httpServer = createServer(app);
    
    // Setup WebSocket server for subscriptions
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: SUBSCRIPTIONS_PATH
    });
    
    const serverCleanup = useServer({ schema }, wsServer);
    
    // Create Apollo Server
    const server = new ApolloServer({
      schema,
      introspection: true,
      formatError: (err) => {
        console.error('GraphQL Error:', err);
        return {
          message: 'Something went wrong',
          code: err.extensions?.code,
          locations: err.locations,
        }
      },
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
    });

    // Start the server
    await server.start();
    console.log('✅ Apollo Server started');

    // Configure Express middleware
    app.use(
      API_PATH,
      cors<cors.CorsRequest>({
        origin: ['http://localhost:3030', 'http://localhost:5173'],
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
      }),
      express.json(),
      expressMiddleware(server, {
        context: createContext
      })
    );

    // Error Middleware to trace errors
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      console.error('Unhandled error:', err.stack || err);
      res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
      });
    });
    
    // Start HTTP server
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${API_PATH}`);
      console.log(`🔌 WebSocket server ready at ws://localhost:${PORT}${SUBSCRIPTIONS_PATH}`);
    });
    
    // Initialize CRON jobs
    initCronJobs();
    console.log('⏰ CRON jobs initialized');
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();