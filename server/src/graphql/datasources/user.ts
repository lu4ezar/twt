import { DataSource } from 'apollo-datasource';
import { Collection } from 'mongoose';
import {
  AuthPayload,
  AuthUserInput,
  CreateUserInput,
} from '../../generated/graphql';
import jwt from 'jsonwebtoken';
import User from '../../mongoose/user.model';

export default class UserAPI extends DataSource {
  collection: Collection;
  constructor(collection: Collection) {
    super();
    this.collection = collection;
  }

  // Mutations
  async createUser(input: CreateUserInput): Promise<AuthPayload> {
    const user = new User(input);
    await user.save();
    const token = jwt.sign(user.toJSON(), process.env.SECRET || '');
    return { token };
  }
  async authUser(input: AuthUserInput): Promise<AuthPayload> {
    const { login, password } = input;
    const user = await User.findOne({ login });
    if (!user) {
      throw new Error('User not found');
    }

    const passMatch = user.validatePassword(password);
    if (!passMatch) {
      throw new Error('Incorrect password');
    }
    const token = jwt.sign(user.toJSON(), process.env.SECRET || '');
    return { token };
  }
}
