import { z } from 'zod'

export const ContextSchema = z.object({
    email: z.string().email().optional(),
    res: z.any(),
})

export type ContextType = z.infer<typeof ContextSchema>
