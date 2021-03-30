import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { UserInput } from '../../generated/graphql';
import { useLoginMutation } from '../../apollo/hooks/user';

const initialValues: UserInput = {
  login: '',
  password: '',
};

const Login = () => {
  const { loginUser } = useLoginMutation();
  const [isFormVisible, setFormVisible] = React.useState(false);

  const onSubmit = async (values: UserInput) => {
    const { login, password } = values;
    const variables = {
      input: {
        login,
        password,
      },
    };
    try {
      await loginUser({
        variables,
      });
      setFormVisible(false);
    } catch (err) {
      throw new Error(err);
    }
  };

  return isFormVisible ? (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Field type='login' name='login' />
          <ErrorMessage name='login' component='div' />
          <Field type='password' name='password' />
          <ErrorMessage name='password' component='div' />
          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  ) : (
    <button onClick={() => setFormVisible(true)} disabled={isFormVisible}>
      Login
    </button>
  );
};

export default Login;
