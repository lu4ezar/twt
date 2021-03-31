import { gql, useMutation } from '@apollo/client';
import { errorVar, isLoggedInVar } from '..';

const LOGIN_USER = gql`
  mutation loginUser($input: UserInput!) {
    loginUser(input: $input) {
      token
    }
  }
`;

export const useLoginMutation = () => {
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      if (data) {
        const {
          loginUser: { token },
        } = data;
        localStorage.setItem('token', token);
        isLoggedInVar(true);
      }
    },
    errorPolicy: 'all',
    onError: (err) => {
      localStorage.removeItem('token');
      isLoggedInVar(true);
      errorVar(err.message);
    },
  });
  return {
    loginUser,
    loading,
    error,
  };
};
