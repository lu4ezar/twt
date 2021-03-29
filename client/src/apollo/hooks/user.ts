import jwtDecode from 'jwt-decode';
import { ApolloError, gql, useMutation } from '@apollo/client';
// import { CREATE_USER, AUTH_USER } from '../mutations/user';
import React from 'react';
// import { isLoggedInVar } from "../cache";

const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $user) {
      token
    }
  }
`;

const AUTH_USER = gql`
  mutation authUser($input: AuthUserInput!) {
    createUser(input: $user) {
      token
    }
  }
`;

export const useGetUserFromToken = () => {
  let [user, setUser] = React.useState(null);
  const getUser = () => {
    const token = localStorage.getItem('token');
    user = jwtDecode(token as string);
    setUser(user);
    console.log(user);
    return user;
  };
  React.useEffect(() => {
    window.addEventListener('storage', getUser);
    return () => window.removeEventListener('storage', getUser);
  });
  return [user];
};

export const useLoginMutation = () => {
  const [loginUser, { loading, error }] = useMutation(AUTH_USER, {
    onCompleted: (data) => {
      if (data) {
        const {
          loginUser: { token },
        } = data;
        const user = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify(user));
        // isLoggedInVar(true);
      }
    },
    errorPolicy: 'all',
    onError: (err) => {
      localStorage.removeItem('user');
      throw new ApolloError(err);
    },
  });
  return {
    loginUser,
    loading,
    error,
  };
};

export const useCreateUserMutation = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      if (data) {
        const {
          createUser: { token },
        } = data;
        const user = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
  });
  return {
    createUser,
    loading,
    error,
  };
};
