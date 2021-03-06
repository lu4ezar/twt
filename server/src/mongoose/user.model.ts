import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from './user.interface';

const { model, Schema } = mongoose;

const UserSchema = new Schema({
  login: { type: String, unique: true },
  password: String,
});

UserSchema.virtual('twits', {
  ref: 'Twit',
  localField: '_id',
  foreignField: 'author',
});

UserSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    return err;
  }
});

UserSchema.methods.validatePassword = async function validatePassword(
  this,
  candidate,
) {
  return bcrypt.compare(candidate, (this as IUser).password);
};

export default model<IUser>('User', UserSchema);
