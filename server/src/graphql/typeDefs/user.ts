import { gql } from 'apollo-server-express';

export default gql`
  """
  User Type
  """
  type User {
    _id: ID!
    login: String!
    password: String!
  }

  extend type Mutation {
    loginUser(input: UserInput!): AuthPayload!
  }

  type AuthPayload {
    token: String!
  }

  input UserInput {
    login: String!
    password: String!
  }
`;
