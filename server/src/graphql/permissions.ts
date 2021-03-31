import { rule, shield, allow } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(
  (_, __, ctx) => ctx.user != null,
);

const permissions = shield({
  Query: {
    '*': allow,
  },

  Mutation: {
    loginUser: allow,
    postTwit: isAuthenticated,
    postReply: isAuthenticated,
  },
});

export default permissions;
