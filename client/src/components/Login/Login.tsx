import React from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { AuthUserInput } from '../../generated/graphql';

const initialValues: AuthUserInput = {
  login: '',
  password: '',
};

Modal.setAppElement('#root');

const Login = () => {
  // var subtitle: { style: { color: string } };
  console.log('login');
  const [modalIsOpen, setIsOpen] = React.useState(true);
  function afterOpenModal() {
    console.log('after open');
  }
  function closeModal() {
    setIsOpen(false);
  }
  const onSubmit = (values: any, { setSubmitting }: any) => {
    console.log(values);
    setSubmitting(true);
    // setIsLoggedIn(false);
    closeModal();
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      //style={customStyles}
      contentLabel='Example Modal'
    >
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Field type='login' name='login' />
            <ErrorMessage name='login' component='div' />
            <Field type='password' name='password' />
            <ErrorMessage name='password' component='div' />
            <button type='submit' disabled={isSubmitting}>
              Okay
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default Login;
