import express from 'express';
// const express = require('express');
const router = express.Router();
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const lb = dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

//@route    GET api/auth
//@desc     Get logged in user
//@access   Private  because you need authentication
router.get(
  '/',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  (req, res) => {
    res.send('Get logged in user');
  }
);

//@route    POST api/auth
//@desc     Auth user & get token
//@access   Publick
router.post('/', (req, res) => {
  res.send('Get logged in user');
});

export default router;
// module.exports = router;
