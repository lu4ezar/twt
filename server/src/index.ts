/* eslint-disable no-console */
import { ApolloServer } from "apollo-server-express";
import express from "express";
// import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors";
import schema from "./graphql/schema";
// import userTypeDefs from './graphql/typeDefs/user';
// import twitTypeDefs from './graphql/typeDefs/twit';
// import { permissions } from './graphql/permissions';
// import { applyMiddleware } from 'graphql-middleware';
import dataSources from "./graphql/datasources";

const connectionString =
  process.env.NODE_ENV === "development"
    ? "mongodb://127.0.0.1:27017/twitts"
    : "mongodb://mongo:27017/twitts";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error: ", err.message);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

process.on("SIGINT", () => {
  console.log("Shutting down...");
  process.exit();
});

const app = express();
app.use(cors());

export const server = new ApolloServer({
  schema,
  // typeDefs: [userTypeDefs, twitTypeDefs],
  dataSources,
});

server.applyMiddleware({
  app,
  // cors: { origin: process.env.ORIGIN || '', credentials: false },
  // cors: { origin: 'http://localhost:3000' },
});

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log("server is ready", process.env.NODE_ENV)
);

export default server;
