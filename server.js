// const express = require('express');
import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;
// const connectDB = require('./config/db');
import connectDB from './config/db.js';
import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import contactsRoutes from './routes/contacts.js';

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('Hello World'));
app.get('/', (req, res) => res.json({ msg: 'Welcome to the ContactKeeper API' }));

//Define routes
// app.use('/api/users', require('./routes/users'));
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
