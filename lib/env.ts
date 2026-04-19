import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    SESSION_SECRET: z.string().min(3),
    COOKIE_SECURE: z.enum(["0", "1"]).default("0").optional(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    COOKIE_SECURE: process.env.COOKIE_SECURE,
  },
});
