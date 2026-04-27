import z from "zod";

export const baseQuerySchema = z.object({
  page: z.number().default(1),
  size: z.number().default(20),
  search: z.string().trim().optional(),
});

export type BaseQueryType = z.infer<typeof baseQuerySchema>;
