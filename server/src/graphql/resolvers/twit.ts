import { Resolvers, Twit } from '../../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    twitts: (_, __, { dataSources }): Twit[] => dataSources.twitAPI.getTwitts(),
    replies: (_, { id }, { dataSources }): Twit[] =>
      dataSources.twitAPI.getReplies(id),
  },
  Mutation: {
    postTwit: (_, { input }, { dataSources }): Twit =>
      dataSources.twitAPI.postTwit({
        ...input,
        author: input.author,
      }),
    postReply: (_, { input }, { dataSources }): Twit =>
      dataSources.twitAPI.postReply({
        ...input,
        author: input.author,
        parent: input.parent,
      }),
  },
};

export default resolvers;
