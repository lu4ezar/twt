"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = __importDefault(require("./schema"));
const mongoose_1 = __importDefault(require("mongoose"));
// mongoose.connect(process.env.DB_PATH as string, {
mongoose_1.default.connect('mongodb://127.0.0.1:27017/twitts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
mongoose_1.default.connection.on('error', (err) => {
    console.log('MongoDB connection error: ', err.message);
});
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB');
});
process.on('SIGINT', () => {
    console.log('Shutting down...');
    process.exit();
});
(async () => {
    const server = new apollo_server_1.ApolloServer({
        schema: schema_1.default,
    });
    const { url } = await server.listen(process.env.SERVER_PORT || 4000);
    console.log(`Server running on ${url}`);
})();
// const server = new ApolloServer({ schema });
// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });
