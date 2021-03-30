import { DataSource } from 'apollo-datasource';
import { Collection } from 'mongoose';
import jwt from 'jsonwebtoken';
import { AuthPayload, UserInput } from '../../generated/graphql';
import User from '../../mongoose/user.model';

export default class UserAPI extends DataSource {
  collection: Collection;

  constructor(collection: Collection) {
    super();
    this.collection = collection;
  }

  // Mutations
  async loginUser({ login, password }: UserInput): Promise<AuthPayload> {
    let user;
    const existingUser = await User.findOne({
      login,
    });
    if (existingUser) {
      const passMatch = await existingUser.validatePassword(password);
      if (!passMatch) {
        throw new Error('Incorrect password');
      }
      user = existingUser;
    } else {
      user = new User({ login, password });
      await user.save();
    }
    const token = jwt.sign(user.toJSON(), process.env.SECRET || '');
    return { token };
  }
}
