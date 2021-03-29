import { Document } from "mongoose";
import { Scalars } from "../generated/graphql";

export interface IUser extends Document {
  _id: Scalars["ID"];
  login: string;
  password: string;
  validatePassword: (password: string) => boolean;
}
