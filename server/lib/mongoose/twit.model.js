"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { model, Schema } = mongoose_1.default;
const TwitSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        operation: {
            type: String,
            enum: ['add', 'sub', 'mult', 'div'],
            default: 'add',
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
exports.default = model('Twit', TwitSchema);
