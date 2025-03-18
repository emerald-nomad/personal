import { TypedDocumentString } from "./generated/client/graphql"

export async function execute<TResult, TVariables = null>(
  query: TypedDocumentString<TResult, TVariables>,
  // ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
  variables?: TVariables
) {
  const response = await fetch(process.env.SANITY_GRAPHQL_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  })
 
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
 
  return (await response.json()).data as TResult
}