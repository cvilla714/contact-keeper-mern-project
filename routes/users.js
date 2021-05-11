import express from 'express';
// const express = require('express');
const router = express.Router();
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';

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
  (req, res) => {
    // res.send('Register a user');
    // res.send(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('passed');
  }
);

export default router;
// module.exports = router;
