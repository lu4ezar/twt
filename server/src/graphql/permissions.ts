import { rule, shield, allow, deny } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(
  (_, __, ctx) => ctx.user != null,
);

const isAuthorized = rule({ cache: 'strict' })((_, __, ctx) => {
  return !!ctx.user.login;
});

export const permissions = shield({
  Query: {
    '*': allow,
  },

  Mutation: {
    '*': allow,
  },
});
