import { z } from 'zod'

// Define the resource node schema
export const ResourceSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type Resource = z.infer<typeof ResourceSchema>

// Schema for creating a new resource
export const CreateResourceSchema = ResourceSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
})

export type CreateResourceInput = z.infer<typeof CreateResourceSchema>

// Cypher queries for resources
export const ResourceQueries = {
  create: `
    CREATE (r:Resource {
      id: $id,
      content: $content,
      createdAt: datetime(),
      updatedAt: datetime()
    })
    RETURN r
  `,
  getById: `
    MATCH (r:Resource {id: $id})
    RETURN r
  `,
  // Add more queries as needed
}