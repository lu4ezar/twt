import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const URI_PATH = 'http://localhost:4000/graphql';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: URI_PATH,
});

export const isLoggedInVar = makeVar(!!localStorage.getItem('token'));
export const errorVar = makeVar<string | null>(null);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        errorVar: {
          read() {
            return errorVar();
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  link: from([authLink, httpLink]),
});

export default client;
