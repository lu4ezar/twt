import { useState } from 'react';
import { User } from '../generated/graphql';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { useApolloClient } from '@apollo/client';

type IUser = User | null;

export const useCurrentUser = () => {
  const getUser = (): IUser => {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const user = jwt_decode<JwtPayload>(token) as User;
    return user;
  };

  const [user, setUser] = useState<User | null>(getUser());

  return {
    setUser,
    user,
  };
};

export const useGetAnswers = () => {
  const client = useApolloClient();
  const data = client.cache;
  return data;
};
