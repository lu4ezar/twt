import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { UserInput } from '../../generated/graphql';
import { useLoginMutation } from '../../apollo/hooks/user';

const initialValues: UserInput = {
  login: '',
  password: '',
};

const validate = (values: UserInput) => {
  const errors = {} as any;
  if (!values.login || values.login.trim().length < 3) {
    errors.login = 'Required, 3 letters and more';
  }

  if (!values.password || values.login.trim().length < 3) {
    errors.password = 'Required, 3 letters and more';
  }
};

const Login = () => {
  const { loginUser } = useLoginMutation();
  const [isFormVisible, setFormVisible] = React.useState(false);

  const onSubmit = (values: UserInput) => {
    const { login, password } = values;
    const variables = {
      input: {
        login,
        password,
      },
    };
    loginUser({
      variables,
    });
    setFormVisible(false);
  };

  return isFormVisible ? (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Form>
            <Field
              validate={validate}
              type='login'
              name='login'
              placeholder='Login'
            />
            <ErrorMessage name='login' component='div' />
            <Field
              validate={validate}
              type='password'
              name='password'
              placeholder='Password'
            />
            <ErrorMessage name='password' component='div' />
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>
  ) : (
    <button onClick={() => setFormVisible(true)} disabled={isFormVisible}>
      Login
    </button>
  );
};

export default Login;
