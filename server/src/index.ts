/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import server from './server';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

server.applyMiddleware({
  app,
});

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log('server is ready', process.env.NODE_ENV),
);
