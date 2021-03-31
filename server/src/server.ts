import { ApolloServer } from 'apollo-server-express';
import { Request, Response } from 'express';
import { applyMiddleware } from 'graphql-middleware';
import jwt from 'jsonwebtoken';
import schema from './graphql/schema';
import dataSources from './graphql/datasources';
import db from './db';
import permissions from './graphql/permissions';

const server = new ApolloServer({
  dataSources,
  schema: applyMiddleware(schema, permissions),
  context: async function createContext({
    req,
    res,
  }: {
    req: Request;
    res: Response;
  }) {
    let user;

    try {
      if (req && req.headers.authorization) {
        const token = (req.headers.authorization as string).split(' ')[1] || '';
        user = jwt.verify(token, process.env.SECRET as string);
        return { db, res, user };
      }
    } catch (err) {
      console.error(err.message);
    }
    return { db, res, user: null };
  },
  introspection: true,
});

export default server;
