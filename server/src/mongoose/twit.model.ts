import mongoose from 'mongoose';
import { Operation } from '../generated/graphql';

const { model, Schema } = mongoose;

const TwitSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    operation: {
      type: Operation,
      enum: ['add', 'sub', 'mult', 'div'],
    },
    number: {
      type: Number,
      default: 1,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Twit',
    default: null,
  },
  replies: { type: [Schema.Types.ObjectId], ref: 'Twit', default: [] },
});

export default model('Twit', TwitSchema);
