import { setupWorker, graphql } from 'msw'; 
import { server } from './index.ts';
import { gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';

const worker = setupWorker();
