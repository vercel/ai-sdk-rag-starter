import { z } from 'zod'

export const EntitySchema = z.object({
  id: z.string(),
  type: z.string(),
  properties: z.record(z.string(), z.any()),
  embedding: z.array(z.number()).optional()
})

export type Entity = z.infer<typeof EntitySchema>