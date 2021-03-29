import mongoose from "mongoose";

const { model, Schema } = mongoose;

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
  root: { type: Schema.Types.ObjectId },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  replies: { type: [Schema.Types.ObjectId], ref: "Twit", default: [] },
  // replies: {
  //   type: [this],
  //   lean: true,
  // },
  // replies: [self],
  // parent: {
  //   type: Schema.Types.ObjectId,
  //   default: null,
  // },
});

TwitSchema.pre("find", async function populateReplies() {
  await this.populate("replies");
});

TwitSchema.virtual("repliesPopulated", {
  ref: "Twit",
  localField: "parent",
  foreignField: "_id",
});

export default model("Twit", TwitSchema);
