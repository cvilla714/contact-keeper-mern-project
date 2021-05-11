import mongoose from 'mongoose';
// const mongoose = require('mongoose');
// import config from 'config';
// const config = require('config');
// const db = config.get('mongoURI');
// require('dotenv').config();
import dotenv from 'dotenv';
const lb = dotenv.config();
// console.log(process.env);
// console.log(lb);

const db = process.env.MY_MONGO_URI;

// let db = process.env.MY_MONGO_URI;
// console.log(db);

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
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
// module.exports = connectDB;
