import React from 'react';
import { Twit as ITwit } from '../../generated/graphql';

const Twit = ({ twit }: { twit: ITwit }) => {
  const [showReplies, setShowReplies] = React.useState(false);
  return (
    <li>
      <div>{twit.author}</div>
      <div>{twit.content.operation}</div>
      <div>{twit.content.number}</div>
      {twit.replies?.length && (
        <>
          <button onClick={() => setShowReplies(!showReplies)}>
            {showReplies ? 'hide' : 'show'} replies
          </button>
          {showReplies &&
            twit?.replies.map((reply) => <div>{reply.content.operation}</div>)}
        </>
      )}
    </li>
  );
};

export default Twit;
