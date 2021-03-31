/* eslint-disable class-methods-use-this */
import { DataSource } from 'apollo-datasource';
import { Collection } from 'mongoose';
import { ITwit } from '../../mongoose/twit.interface';
import Twit from '../../mongoose/twit.model';
import { PostReplyInput, PostTwitInput } from '../../generated/graphql';

export default class TwitAPI extends DataSource {
  collection: Collection;

  constructor(collection: Collection) {
    super();
    this.collection = collection;
  }

  // Queries
  async getTwitts(): Promise<Array<ITwit>> {
    const twitts = await Twit.find({ parent: null });
    return twitts;
  }

  async getReplies(id: ITwit['id']): Promise<Array<ITwit>> {
    const replies = await Twit.find({ parent: id }).populate({
      path: 'replies',
      populate: { path: 'replies' },
    });
    return replies;
  }

  // Mutations
  async postTwit(input: PostTwitInput): Promise<ITwit> {
    const twit = new Twit(input) as ITwit;
    return twit.save();
  }

  async postReply(input: PostReplyInput): Promise<ITwit> {
    const reply = new Twit(input) as ITwit;
    await Twit.findOneAndUpdate(
      { _id: input.parent },
      { $push: { replies: reply.id } },
    );
    return reply.save();
  }
}
