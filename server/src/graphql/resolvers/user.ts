import { AuthPayload, Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Mutation: {
    loginUser: async (_, { input }, { dataSources }): Promise<AuthPayload> => {
      const { token } = await dataSources.userAPI.loginUser(input);
      return { token };
    },
  },
};

export default resolvers;
