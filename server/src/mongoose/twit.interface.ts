import { Document, ObjectId, Types } from "mongoose";
import { Scalars } from "../generated/graphql";
import { IUser } from "./user.interface";

export interface ITwit extends Document {
  _id: Scalars["ID"];
  author: IUser["id"];
  content: {
    operation: string;
    number: number;
  };
  isRoot: boolean;
  createdAt: Date;
  replies: Types.DocumentArray<ITwit>;
  parent: ObjectId;
}
