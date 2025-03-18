import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: process.env.SANITY_GRAPHQL_ENDPOINT,
  documents: ['src/app/**/*.tsx'],
  generates: { 
    './src/graphql/generated/types.ts': { plugins: ['typescript', 'typescript-operations'] },
    './src/graphql/generated/client/': {
      preset: 'client',
      config: {
        documentMode: 'string'
      }
    },
    './src/graphql/generated/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    }
  }
}
export default config