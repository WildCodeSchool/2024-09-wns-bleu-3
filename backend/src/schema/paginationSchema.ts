import z from 'zod'
import sanitizeHtml from 'sanitize-html'

export const paginationSchema = z.object({
    limit: z.number().min(1).max(100).default(10),
    offset: z.number().min(0).default(0),
    // Sanitize the search term to prevent XSS attacks
    search: z.string().trim().transform(val => sanitizeHtml(val).toLowerCase()).optional(),
})

export type PaginiationType = z.infer<typeof paginationSchema>
