import { Resolvers, Twit } from '../../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    twitts: (_, __, { dataSources }): Twit[] => dataSources.twitAPI.getTwitts(),
    replies: (_, { id }, { dataSources }): Twit[] =>
      dataSources.twitAPI.getReplies(id),
  },
  Mutation: {
    postTwit: (_, { input: { author, content } }, { dataSources }): Twit =>
      dataSources.twitAPI.postTwit({
        author,
        content,
      }),
  },
};

export default resolvers;
