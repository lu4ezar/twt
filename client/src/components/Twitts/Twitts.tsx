import { isLoggedInVar } from '../../apollo';
import { Twit as ITwit } from '../../generated/graphql';
import TwitCard from '../TwitCard';
import TwitForm from '../TwitForm';

const Twitts = ({ twitts }: { twitts: ITwit[] }) => {
  const isLoggedIn = isLoggedInVar();
  return (
    <div>
      {isLoggedIn && <TwitForm />}
      <ul>
        {twitts.map((twit) => (
          <TwitCard key={twit._id} twit={twit} isLoggedIn={isLoggedIn} />
        ))}
      </ul>
    </div>
  );
};

export default Twitts;
