import { Resolvers, Twit } from '../../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    twitts: async (_, __, { dataSources }): Promise<Twit[]> =>
      await dataSources.twitAPI.getTwitts(),
    replies: (_, { id }, { dataSources }): Twit[] =>
      dataSources.twitAPI.getTwitts({ id }),
  },
  Mutation: {
    postTwit: (parent, { input }, { dataSources, user }): Twit => {
      console.log(parent);
      console.log(user);
      return dataSources.twitAPI.postTwit({
        ...input,
        author: input.author,
        root: null,
      });
    },
    postReply: (_, { input }, { dataSources, user }): Twit =>
      dataSources.twitAPI.postReply({
        ...input,
        author: input.author,
        parent: input.parent,
        root: input.root,
      }),
  },
};

export default resolvers;
