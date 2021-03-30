import { gql } from "apollo-server-express";

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
    createUser(input: CreateUserInput!): AuthPayload!
    authUser(input: AuthUserInput!): AuthPayload!
  }

  type AuthPayload {
    token: String!
  }

  input CreateUserInput {
    login: String!
    password: String!
  }

  input AuthUserInput {
    login: String!
    password: String!
  }
`;
