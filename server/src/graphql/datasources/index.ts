import TwitAPI from "./twit";
import UserAPI from "./user";
import UserModel from "../../mongoose/user.model.ts";
import TwitModel from "../../mongoose/twit.model.ts";

export default () => ({
  userAPI: new UserAPI(UserModel.collection),
  twitAPI: new TwitAPI(TwitModel.collection),
});
