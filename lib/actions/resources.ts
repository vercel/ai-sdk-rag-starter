'use server';

import { driver } from '../db/client'
import { generateEmbedding } from '../ai/embedding'
import { nanoid } from '../utils'

export const createResource = async (input: { content: string }) => {
  const session = driver.session()
  try {
    const id = nanoid()
    const embedding = await generateEmbedding(input.content)

    await session.run(`
      CREATE (r:Resource {
        id: $id,
        content: $content,
        embedding: $embedding,
        createdAt: datetime(),
        updatedAt: datetime()
      })
    `, {
      id,
      content: input.content,
      embedding
    })

    return 'Resource successfully created and embedded.'
  } catch (error) {
    return error instanceof Error && error.message.length > 0
      ? error.message
      : 'Error, please try again.'
  } finally {
    await session.close()
  }
}