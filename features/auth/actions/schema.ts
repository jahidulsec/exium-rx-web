import z from 'zod'

export const LoginSchema = z.object({
    sap_id: z
        .string()
        .min(1, "SAP ID must be at least 1 characters."),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters.")
        .max(100, "Password must be at most 100 characters."),
})

export type LoginType = z.infer<typeof LoginSchema>