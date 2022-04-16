import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

export const ApolloWrapper = (Component) => (props) => {
  return (
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>
  )
}
