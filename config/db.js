const mongoose = require('mongoose');
const config = require('config');
// const db = config.get('mongoURI');
require('dotenv').config();
let db = process.env.MY_MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('MogoDB Connected..');
  } catch (error) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
