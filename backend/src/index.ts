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
import * as cookie from "cookie";

async function start() {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error('no jwt secret')
    }
    await dataHealthCheck.initialize()

    const schema = await buildSchema({
        resolvers: [ScanResolver, FrequenceResolver, TagResolver, UserResolver],
        authChecker: ({ context }) => {
            return !!context.email; // Retourne true si l'email existe, sinon false
        }
    })

    const server = new ApolloServer({
        schema,
    })

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req, res }) => {
            if (req.headers.cookie) {
                const cookies = cookie.parse(req.headers.cookie as string);
                console.log("Headers ===> ", req.headers);
                console.log("Cookies in Headers ===> ", cookies);

                if (cookies.token !== undefined) {
                    try {
                        const payload: any = jwt.verify(
                            cookies.token,
                            process.env.JWT_SECRET_KEY as Secret
                        );
                        console.log("payload in context", payload);
                        if (payload) {
                            console.log("payload was found and returned to resolver");
                            return { email: payload.email, res: res };
                        }
                    } catch (error) {
                        console.error("JWT verification failed: ", error);
                    }
                }
            }
            return { res: res };
        },
    })

    console.log(`🚀 Server ready at ${url}`)
}

start()