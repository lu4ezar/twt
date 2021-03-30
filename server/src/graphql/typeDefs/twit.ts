import { gql } from "apollo-server-express";

export default gql`
  scalar DateTime
  """
  Twit Type
  """
  type TwitContent {
    operation: String
    number: Float!
  }

  type Twit {
    _id: ID!
    author: ID!
    content: TwitContent!
    root: Float
    createdAt: DateTime!
    replies: [Twit!]!
    parent: ID!
  }

  input TwitInput {
    operation: String!
    number: Float!
  }

  type Query {
    twitts: [Twit!]!
    replies(id: ID!): [Twit!]!
  }

  input PostTwitInput {
    author: ID!
    content: TwitInput!
  }

  input PostReplyInput {
    author: ID!
    root: ID!
    parent: ID!
    content: TwitInput!
  }

  type Mutation {
    postTwit(input: PostTwitInput!): Twit!
    postReply(input: PostReplyInput!): Twit!
  }
`;
