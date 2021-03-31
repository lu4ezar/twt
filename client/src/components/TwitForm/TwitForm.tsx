import { Field, Formik } from 'formik';
import { useState } from 'react';
import { usePostTwit } from '../../apollo/hooks/twit';
import {
  Operation,
  TwitInput,
  ReplyInput,
  Twit,
  PostReplyInput,
} from '../../generated/graphql';

const TwitForm = ({
  parentTwitId = null,
}: {
  parentTwitId?: Twit['_id'] | null;
}) => {
  const isReply = !!parentTwitId;
  const { postTwit } = usePostTwit();
  const [showForm, setShowForm] = useState(false);

  const validate = (values: TwitInput | ReplyInput) => {
    const errors = {} as any;
    if (isReply) {
      if (!(values as ReplyInput).operation) {
        errors.operation = 'Required';
      }
    }
    if (typeof Number(values.number) !== 'number') {
      errors.number('Enter number');
    }
    if (
      +values.number === 0 &&
      (values as ReplyInput).operation === Operation.Div
    ) {
      errors.both = "You can't do that. No one can";
    }
  };

  const initialValues: PostReplyInput['content'] = {
    operation: Operation.Add,
    number: 0,
  };

  const onSubmit = (values: PostReplyInput['content']) => {
    postTwit({ variables: { ...values } });
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <>
          <button onClick={() => setShowForm(!showForm)}>Post Twit</button>
          <form>
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
            <button type='submit'>submit</button>
          </form>
        </>
      </Formik>
    </div>
  );
};

export default TwitForm;
