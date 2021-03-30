import TwitAPI from './twit';
import UserAPI from './user';
import UserModel from '../../mongoose/user.model';
import TwitModel from '../../mongoose/twit.model';

export default () => ({
  userAPI: new UserAPI(UserModel.collection),
  twitAPI: new TwitAPI(TwitModel.collection),
});
