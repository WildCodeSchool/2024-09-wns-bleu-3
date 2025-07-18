import { z } from 'zod'

export const ContextSchema = z.object({
    email: z.string().email().optional(),
    id: z.number().optional(),
    res: z.any(),
    role: z.string().optional(),
})

export type ContextType = z.infer<typeof ContextSchema>
export type Context = ContextType
