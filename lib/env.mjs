import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NEO4J_URI: z.string().url(),
    NEO4J_USERNAME: z.string().min(1),
    NEO4J_PASSWORD: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1)
  },
  client: {},
  runtimeEnv: {
    NEO4J_URI: process.env.NEO4J_URI,
    NEO4J_USERNAME: process.env.NEO4J_USERNAME,
    NEO4J_PASSWORD: process.env.NEO4J_PASSWORD,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  }
})