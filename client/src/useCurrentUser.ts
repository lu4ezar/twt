import { useState } from 'react';
import { User } from './generated/graphql';
import jwt_decode, { JwtPayload } from 'jwt-decode';

type IUser = User | null;

export default function useCurrentUser() {
  const getUser = (): IUser => {
    const tokenStr = localStorage.getItem('token');
    if (!tokenStr) {
      return null;
    }
    const token = JSON.parse(tokenStr);
    const user = jwt_decode<JwtPayload>(token) as User;
    return user;
  };

  const [user, setUser] = useState<User | null>(getUser());

  return {
    setUser,
    user,
  };
}
