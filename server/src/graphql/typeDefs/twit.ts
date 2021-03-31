import { gql } from 'apollo-server-express';

export default gql`
  scalar DateTime
  """
  Twit Type
  """
  enum Operation {
    ADD
    SUB
    MULT
    DIV
  }

  type Content {
    operation: Operation
    number: Float!
  }

  type Twit {
    _id: ID!
    author: ID!
    content: Content!
    createdAt: DateTime!
    replies: [Twit!]!
    parent: ID!
  }

  input TwitInput {
    operation: Operation
    number: Float!
  }

  input PostTwitInput {
    author: ID!
    parent: ID
    content: TwitInput!
  }

  type Query {
    twitts: [Twit!]!
    replies(id: ID!): [Twit!]!
  }

  type Mutation {
    postTwit(input: PostTwitInput!): Twit!
  }
`;
