import React from 'react';
import { Twit as ITwit } from '../../generated/graphql';
import Twit from '../Twit';

const Twitts = ({ twitts }: { twitts: ITwit[] }) => (
  <ul>
    {twitts.map((twit) => (
      <Twit key={twit._id} twit={twit} />
    ))}
  </ul>
);

export default Twitts;
