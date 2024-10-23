// lib/db/client.ts
import neo4j from 'neo4j-driver'

// Parse the connection URI safely
const uri = process.env.NEO4J_URI || ''
const username = process.env.NEO4J_USERNAME || 'neo4j'
const password = process.env.NEO4J_PASSWORD || ''

// Create the driver with explicit configuration
const driver = neo4j.driver(
  uri,
  neo4j.auth.basic(username, password),
  {
    encrypted: 'ENCRYPTION_ON',
    trust: 'TRUST_SYSTEM_CA_SIGNED_CERTIFICATES',
    maxConnectionPoolSize: 100,
    maxTransactionRetryTime: 30000
  }
)

// Verify connection function
export const verifyConnection = async () => {
  const session = driver.session()
  try {
    const result = await session.run('RETURN 1 as success')
    console.log('Successfully connected to Neo4j')
    return result.records[0].get('success') === 1
  } catch (error) {
    console.error('Failed to connect to Neo4j:', error)
    throw error
  } finally {
    await session.close()
  }
}

export { driver }