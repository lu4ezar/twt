import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';
import dataSources from './graphql/datasources';
import db from './db';

const server = new ApolloServer({
  schema,
  dataSources,
  context: () => ({
    db,
  }),
});

export default server;
