// const express = require('express');
import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;
import connectDB from './config/db.js';
import path from 'path';
// const __dirname = path.resolve();
import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import contactsRoutes from './routes/contacts.js';

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

//Define routes
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);

//Server static assets in productions
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get(
    '*',
    (req, res) =>
      // res.sendFile(path.join(__dirname, 'client', 'build', 'index.hmtml')),
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')),
    // res.sendFile(__dirname, 'client', 'build', 'index.html'),
  );
}

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
