import { Document, ObjectId, Types } from 'mongoose';
import { Operation, Scalars } from '../generated/graphql';
import { IUser } from './user.interface';

export interface ITwit extends Document {
  _id: Scalars['ID'];
  author: IUser['id'];
  content: {
    operation: Operation;
    number: number;
  };
  createdAt: Date;
  replies: Types.DocumentArray<ITwit>;
  parent: ObjectId;
}
