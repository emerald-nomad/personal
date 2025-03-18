import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'https://gtdmlu06.api.sanity.io/v2023-08-01/graphql/production/default',
  generates: { './src/types/graphql.ts': { plugins: ['typescript', 'typescript-operations'] } }
}
export default config