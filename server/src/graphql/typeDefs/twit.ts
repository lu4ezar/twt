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
    number: Float!
  }

  input ReplyInput {
    operation: Operation!
    number: Float!
  }

  input PostTwitInput {
    author: ID!
    content: TwitInput!
  }

  input PostReplyInput {
    author: ID!
    parent: ID!
    content: ReplyInput!
  }

  type Query {
    twitts: [Twit!]!
    replies(id: ID!): [Twit!]!
  }

  type Mutation {
    postTwit(input: PostTwitInput!): Twit!
    postReply(input: PostReplyInput!): Twit!
  }
`;
