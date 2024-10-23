import { embed, embedMany } from 'ai'
import { openai } from '@ai-sdk/openai'
import { driver } from '../db/client'
import { nanoid } from '../utils'

const embeddingModel = openai.embedding('text-embedding-ada-002')

export const generateEmbedding = async (text: string): Promise<number[]> => {
  const { embedding } = await embed({
    model: embeddingModel,
    value: text
  })
  return embedding
}

export const findSimilarContent = async (query: string, limit: number = 5) => {
  const session = driver.session()
  try {
    const queryEmbedding = await generateEmbedding(query)
    
    const result = await session.run(`
      CALL db.index.vector.queryNodes(
        'documentEmbeddings',
        $limit,
        $embedding
      ) YIELD node, score
      RETURN node.content as content, score
      ORDER BY score DESC
    `, {
      embedding: queryEmbedding,
      limit: limit
    })
    
    return result.records.map(record => ({
      content: record.get('content'),
      similarity: record.get('score')
    }))
  } finally {
    await session.close()
  }
}