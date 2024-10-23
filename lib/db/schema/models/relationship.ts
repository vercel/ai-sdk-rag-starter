import { z } from 'zod'

export const RelationshipSchema = z.object({
  type: z.string(),
  sourceId: z.string(),
  targetId: z.string(),
  properties: z.record(z.string(), z.any()).optional()
})

export type Relationship = z.infer<typeof RelationshipSchema>