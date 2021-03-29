import { makeExecutableSchema } from "apollo-server-express";
import { GraphQLSchema } from "graphql";
// import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import user from "./typeDefs/user";
import twit from "./typeDefs/twit";
import Users from "./resolvers/user";
import Twitts from "./resolvers/twit";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [user, twit],
  resolvers: [Users, Twitts],
});

export default schema;
