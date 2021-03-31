import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { usePostTwit } from '../../apollo/hooks/twit';
import { Operation, TwitInput, Twit, Content } from '../../generated/graphql';
import { useCurrentUser } from '../../util/useCurrentUser';

const initialValues = {
  operation: Operation.Add,
  number: 0,
};

const TwitForm = ({
  parentTwitId = null,
}: {
  parentTwitId?: Twit['_id'] | null;
}) => {
  const isReply = !!parentTwitId;
  const { user } = useCurrentUser();
  const { postTwit } = usePostTwit();
  const [showForm, setShowForm] = useState(false);
  const validate = (values: TwitInput) => {
    const errors = {} as any;
    if (isReply) {
      if (!values.operation) {
        errors.operation = 'Required';
      }
    }
    if (typeof Number(values.number) !== 'number') {
      errors.number('Enter number');
    }
    if (+values.number === 0 && values.operation === Operation.Div) {
      errors.number = "You can't do that. No one can";
    }
  };

  const onSubmit = (values: TwitInput) => {
    const { operation, number } = values;
    let content: Content = {
      number,
    };
    if (isReply) {
      content.operation = operation;
    }
    try {
      postTwit({
        variables: {
          twit: {
            author: user?._id,
            parent: parentTwitId,
            content: {
              operation,
              number,
            },
          },
        },
      });
      setShowForm(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <>
          <button onClick={() => setShowForm(true)}>Post Twit</button>
          {showForm && (
            <Form>
              {isReply && (
                <>
                  <label htmlFor='operation'>Operation</label>
                  <Field as='select' name='operation' validate={validate}>
                    <option value={Operation['Add']}>+</option>
                    <option value={Operation['Sub']}>-</option>
                    <option value={Operation['Mult']}>*</option>
                    <option value={Operation['Div']}>/</option>
                  </Field>
                </>
              )}
              <label htmlFor='number'>Number</label>
              <Field name='number' type='number' validate={validate} />
              <button type='submit' disabled={isSubmitting}>
                submit
              </button>
            </Form>
          )}
        </>
      )}
    </Formik>
  );
};

export default TwitForm;
