import dotenv from 'dotenv-safe';
import mongoose from 'mongoose';

dotenv.config();

// eslint-disable-next-line import/first
import app from './app';

mongoose.Promise = global.Promise;

mongoose
  .connect(String(process.env.DATABASE), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('🤩🍃 MongoDB is Running');
  })
  .catch((err) => {
    console.log(`❌🤬 ${err}`);
    process.exit();
  });

mongoose.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);

const PORT = Number(process.env.PORT);

const server = app.listen(PORT);

server.listen(() => {
  console.log(`Express running on ${server.address()}`);
});
