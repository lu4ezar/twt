import mongoose from 'mongoose';

const connectionString =
  process.env.NODE_ENV === 'development'
    ? 'mongodb://127.0.0.1:27017/twitts'
    : 'mongodb://mongo:27017/twitts';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error: ', err.message);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

process.on('SIGINT', () => {
  console.log('Shutting down...');
  process.exit();
});

export default mongoose.connection;
