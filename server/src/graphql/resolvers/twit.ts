import { Resolvers, Twit } from "../../generated/graphql";

const resolvers: Resolvers = {
  Query: {
    twitts: (_, __, { dataSources }): Promise<Twit[]> =>
      dataSources.twitAPI.getTwitts(),
    replies: (_, { id }, { dataSources }): Twit[] =>
      dataSources.twitAPI.getTwitts({ id }),
  },
  Mutation: {
    postTwit: (parent, { input }, { dataSources}): Twit => {
      return dataSources.twitAPI.postTwit({
        ...input,
        author: input.author,
        root: null,
      });
    },
    postReply: (_, { input }, { dataSources }): Twit =>
      dataSources.twitAPI.postReply({
        ...input,
        author: input.author,
        parent: input.parent,
        root: input.root,
      }),
  },
};

export default resolvers;
