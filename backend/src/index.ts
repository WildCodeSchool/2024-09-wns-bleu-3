import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import cors from 'cors';
import express from 'express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';
import { buildSchema } from 'type-graphql';
import { dataHealthCheck } from './config/db';
import ScanResolver from './resolver/ScanResolver';
import FrequenceResolver from './resolver/FrequenceResolver';
import TagResolver from './resolver/TagResolver';
import UserResolver from './resolver/UserResolver';
import { seedDatabase } from '../scripts/seed';
import { initCronJobs } from './cron';

const PORT = 4000;
const API_PATH = '/api';
const SUBSCRIPTIONS_PATH = '/subscriptions';

// async function createContext({ req, res }: { req: express.Request, res: express.Response }): Promise<any> {
//   return {}; // No need for JWT logic here, returning empty context
// }

async function start() {
  try {
    // Validate environment
    // Removed JWT_SECRET_KEY check

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
    });
    
    // Setup Express app and HTTP server
    const app = express();
    const httpServer = createServer(app);
    
    // Setup WebSocket server for subscriptions
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: SUBSCRIPTIONS_PATH,
    });
    
    const serverCleanup = useServer({ schema }, wsServer);
    
    // Create Apollo Server
    const server = new ApolloServer({
      schema,
      introspection: true,
      formatError: (err) => {
        console.error('GraphQL Error:', err);
        return err;
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
        origin: ['http://localhost:3030', 'http://localhost:5173', 'https://studio.apollographql.com'],
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
        preflightContinue: false,
      }),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
      }),
    );

    // Debug middleware - add this temporarily
    // app.use((req, _res, next) => {
    //   console.log(`Request to ${req.path}, method: ${req.method}, body:`, req.body);
    //   next();
    // });

    // Error handling middleware
    // app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    //   console.error('Error occurred:', err); // Log the error to the console
    //   res.status(500).json({ error: 'Internal Server Error' }); // Send a proper error message in the response
    // });

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
