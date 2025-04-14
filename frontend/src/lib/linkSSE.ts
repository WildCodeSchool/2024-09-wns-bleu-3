import {
    ApolloLink,
    Operation,
    FetchResult,
    Observable,
  } from '@apollo/client/core';
  import { print } from 'graphql';
  import { createClient, ClientOptions, Client } from 'graphql-sse';

  // Idea from the documentation of graphql-sse with Apollo Client : https://the-guild.dev/graphql/sse/recipes
  
  class SSELink extends ApolloLink {
    private client: Client;
  
    constructor(options: ClientOptions) {
      super();
      this.client = createClient(options);
    }
  
    public request(operation: Operation): Observable<FetchResult> {
      return new Observable((sink) => {
        this.client.subscribe(
            { ...operation, query: print(operation.query) },
            {
              next: sink.next.bind(sink),
              complete: sink.complete.bind(sink),
              error: sink.error.bind(sink),
            }
          );
      });
    }
  }
  
  export const sseLink = new SSELink({
    url: 'http://localhost:3030/api',
    headers: async () => {
      // Add any auth here if needed
      return {
        // Authorization: `Bearer ${token}`,
      };
    },
  });