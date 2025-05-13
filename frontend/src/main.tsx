import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split } from '@apollo/client';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router';
import './index.css';
import { getMainDefinition } from '@apollo/client/utilities';
import { sseLink } from './lib/linkSSE.ts';

//  To create the HTTP Link
const httpLink = createHttpLink({
  uri: '/api',
  credentials: 'include',
})


const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return def.kind === 'OperationDefinition' && def.operation === 'subscription'
  },
  sseLink,
  httpLink,
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </ApolloProvider>
);
