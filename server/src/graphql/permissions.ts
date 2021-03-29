import { rule, shield, allow } from "graphql-shield";

const isAuthenticated = rule({ cache: "contextual" })(
  (_, __, ctx) => ctx.user != null
);

// const isAuthorized = rule({ cache: 'strict' })((_, __, ctx) => !!ctx.user.login);s

const permissions = shield({
  Query: {
    "*": allow,
  },

  Mutation: {
    "*": isAuthenticated,
  },
});

export default permissions;
