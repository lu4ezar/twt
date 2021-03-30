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
    // console.log(this);
    const res = await Twit.find({ root: null });

    // console.log(res);
    // .populate("repliesPopulated")
    // .exec();
    // res = await res;
    // .exec(function (error: any, parents: any) {
    //   console.log('error');
    //   console.log(error);
    //   console.log('parents');
    //   console.log(parents);
    //   /// parents.children is now an array of instances of Child.
    // });
    return [];
  }

  async getReplies(_id: ITwit['id']): Promise<ITwit> {
    return (await Twit.find({ root: _id })) as ITwit;
  }

  // Mutations
  async postTwit(input: PostTwitInput): Promise<ITwit> {
    const twit = new Twit(input) as ITwit;
    return twit.save();
  }

  async postReply(input: PostReplyInput): Promise<ITwit> {
    // const twit = await Twit.find({ _id: input.parent });
    const reply = new Twit(input) as ITwit;
    // twit.save(async (err: Error) => {
    // if (err) {
    // throw new Error(err.message);
    // }
    await reply.save();
    // });
    return reply;
    // const twit = new Twit(input) as ITwit;
    // return await twit.save();

    // return await new Twit(input);
    // return (await Twit.findOneAndUpdate({ _id: input.content }, input, {
    //   new: true,
    // })) as ITwit;
  }
}
