import { model, Schema } from "mongoose";
import { composeMongoose } from "graphql-compose-mongoose";
import { schemaComposer } from "graphql-compose";

const UserSchema = new Schema({
  login: { type: String, unique: true },
  password: String,
});

const TwitSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    operation: {
      type: String,
      enum: ["add", "sub", "mult", "div"],
      default: "add",
    },
    number: {
      type: Number,
      default: 1,
    },
  },
  isRoot: { type: Boolean, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  replies: { type: [Schema.Types.ObjectId], default: [] },
  parent: {
    type: Schema.Types.ObjectId,
    default: null,
  },
});
const Twit = model("Twit", TwitSchema);

UserSchema.post(/delete/i, async function (user) {
  try {
    return await Twit.deleteMany({ author: user._id });
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
});

const User = model("User", UserSchema);

const customizationOptions = {};
const UserTC = composeMongoose(User, customizationOptions);
const TwitTC = composeMongoose(Twit, customizationOptions);

schemaComposer.Query.addFields({
  twitMany: TwitTC.mongooseResolvers.findMany({
    filter: {
      operators: {
        isRoot: true,
      },
    },
  }),
  twitManyLean: TwitTC.mongooseResolvers.findMany({ lean: true }),
});

schemaComposer.Mutation.addFields({
  userCreateOne: UserTC.mongooseResolvers.createOne(),
  twitCreateOne: TwitTC.mongooseResolvers.createOne(),
});

TwitTC.addRelation("author", {
  resolver: () => UserTC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source.author,
  },
  projection: { author: 1 },
});

TwitTC.addRelation("replies", {
  resolver: () => TwitTC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source.replies,
  },
  projection: { replies: 1 },
});

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;
