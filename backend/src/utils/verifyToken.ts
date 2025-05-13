// import { NextFunction, Request, Response } from 'express'
// import * as cookie from 'cookie'
// import jwt, { Secret } from 'jsonwebtoken'
// import { JwtPayload } from 'src/@types/payload'
// import { ContextSchema } from 'src/schema/context'

// export async function verifyTokenMiddleware(req: Request, _res: Response, next: NextFunction) {
//     try {
//         const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {}
//         if (cookies.token) {
//             const payload = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY as Secret) as JwtPayload

//             // Validate payload using Zod
//             const parsedPayload = ContextSchema.safeParse({ email: payload.email })
//             if (parsedPayload.success) {
//                 req.userEmail = payload.email
//             }
//             else {
//                 console.error('Invalid JWT payload:', parsedPayload.error)
//             }
//         }
//     }
//     catch (err) {
//         console.error('JWT verification failed:', err)
//     }

//     next()
// }
