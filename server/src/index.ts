/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';
import server from './server';

dotenv.config();

const app = express();

server.applyMiddleware({
  app,
});

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log('server is ready', process.env.NODE_ENV),
);
