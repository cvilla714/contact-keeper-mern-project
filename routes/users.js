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
// console.log(jwtSecret);

//@route    POST api/users
//@desc     Register a user
//@access   Public because you need authentication
router.post(
  '/',
  [
    body('name', 'Please add name').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    // res.send('Register a user');
    // res.send(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // res.send('passed');
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // res.send('User saved');
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

export default router;
// module.exports = router;
