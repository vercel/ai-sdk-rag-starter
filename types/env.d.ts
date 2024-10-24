declare namespace NodeJS {
  interface ProcessEnv {
    NEO4J_URI: string
    NEO4J_USERNAME: string
    NEO4J_PASSWORD: string
    OPENAI_API_KEY: string
    NODE_ENV: 'development' | 'production' | 'test'
    // Add any other environment variables you need here
  }
}

// To make this file a module (required for TypeScript)
export {}