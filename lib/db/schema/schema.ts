export const setupSchema = async () => {
  const session = driver.session()
  try {
    // Create constraints
    await session.run(`
      CREATE CONSTRAINT resource_id IF NOT EXISTS
      FOR (r:Resource) REQUIRE r.id IS UNIQUE
    `)

    // Create vector index
    await session.run(`
      CALL db.index.vector.createNodeIndex(
        'documentEmbeddings',
        'Resource',
        'embedding',
        1536,
        'cosine'
      )
    `)
  } finally {
    await session.close()
  }
}
