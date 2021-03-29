"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const twit_model_1 = __importDefault(require("./twit.model"));
const { model, Schema } = mongoose_1.default;
const UserSchema = new Schema({
    login: { type: String, unique: true },
    password: String,
});
// UserSchema.pre<IUser>('save', async function () {
//   if (!this.isModified('password')) return;
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   } catch (err) {
//     return err;
//   }
// });
UserSchema.post(/delete/i, async function (user) {
    try {
        return await twit_model_1.default.deleteMany({ owner: user._id });
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
    }
});
// UserSchema.methods.validatePassword = async function (this, candidate) {
//   return bcrypt.compare(candidate, (this as IUser).password);
// };
exports.default = model('User', UserSchema);
