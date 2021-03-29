"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const graphql_compose_1 = require("graphql-compose");
const UserSchema = new mongoose_1.Schema({
    login: { type: String, unique: true },
    password: String,
});
const TwitSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    replies: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: null,
    },
});
const Twit = mongoose_1.model('Twit', TwitSchema);
UserSchema.post(/delete/i, async function (user) {
    try {
        return await Twit.deleteMany({ author: user._id });
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
    }
});
const User = mongoose_1.model('User', UserSchema);
const customizationOptions = {};
const UserTC = graphql_compose_mongoose_1.composeMongoose(User, customizationOptions);
const TwitTC = graphql_compose_mongoose_1.composeMongoose(Twit, customizationOptions);
graphql_compose_1.schemaComposer.Query.addFields({
    twitMany: TwitTC.mongooseResolvers.findMany({
        filter: {
            operators: {
                isRoot: true,
            },
        },
    }),
    twitManyLean: TwitTC.mongooseResolvers.findMany({ lean: true }),
});
graphql_compose_1.schemaComposer.Mutation.addFields({
    userCreateOne: UserTC.mongooseResolvers.createOne(),
    twitCreateOne: TwitTC.mongooseResolvers.createOne(),
});
TwitTC.addRelation('author', {
    resolver: () => UserTC.mongooseResolvers.findById(),
    prepareArgs: {
        _id: (source) => source.author,
    },
    projection: { author: 1 },
});
TwitTC.addRelation('replies', {
    resolver: () => TwitTC.mongooseResolvers.findById(),
    prepareArgs: {
        _id: (source) => source.replies,
    },
    projection: { replies: 1 },
});
const graphqlSchema = graphql_compose_1.schemaComposer.buildSchema();
exports.default = graphqlSchema;
