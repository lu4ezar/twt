// import {
//   Resolvers,
//   QueryResolvers,
//   MutationResolvers,
//   AuthPayload,
// } from '../../generated/graphql';
import { AuthPayload, Resolvers } from '../../generated/graphql';
// import { IUser } from '../../mongoose/user.interface';

const resolvers: Resolvers = {
  Mutation: {
    createUser: async (_, { input }, { dataSources }): Promise<AuthPayload> => {
      const { token } = await dataSources.userAPI.createUser(input);
      return { token };
    },
    authUser: async (_, { input }, { dataSources }): Promise<AuthPayload> => {
      const { token } = await dataSources.userAPI.createUser(input);
      return { token };
    },
  },
};

export default resolvers;
