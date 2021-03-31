import { useLazyQuery } from '@apollo/client';
import React from 'react';
import { GET_REPLIES } from '../../apollo/hooks/twit';
import { Operation, Twit as ITwit, Twit } from '../../generated/graphql';
import TwitForm from '../TwitForm';

const operations = {
  [Operation.Add]: '+',
  [Operation.Sub]: '-',
  [Operation.Mult]: '*',
  [Operation.Div]: '/',
};

const TwitCard = ({
  twit,
  isLoggedIn,
}: {
  twit: ITwit;
  isLoggedIn: boolean;
}) => {
  const [showReplies, setShowReplies] = React.useState(false);
  const [showReplyForm, setShowReplyForm] = React.useState(false);
  const [loadReplies, { data }] = useLazyQuery(GET_REPLIES, {
    variables: {
      id: twit._id,
    },
  });
  return (
    <li>
      <div>
        <div>Author: {twit.author.slice(0, 5)}</div>
        <div>{twit.content.operation}</div>
        <div>{twit.content.number}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {isLoggedIn && (
          <button onClick={() => setShowReplyForm(true)}>Reply</button>
        )}
        {showReplyForm && <TwitForm parentTwitId={twit._id} />}
        {twit.replies.length ? (
          <button
            onClick={() => {
              loadReplies();
              setShowReplies(!showReplies);
            }}
          >
            {showReplies ? 'Hide' : 'Show'} Replies
          </button>
        ) : null}
      </div>
      {showReplies &&
        data &&
        data.replies.map((reply: Twit) => {
          let str = twit.content.number.toString();
          str +=
            // @ts-ignore
            operations[reply.content.operation] +
            reply.content.number.toString();
          return <div key={reply._id}>{eval(str)}</div>;
        })}
    </li>
  );
};

export default TwitCard;
