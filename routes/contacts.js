import express from 'express';
// const express = require('express');
const router = express.Router();
import checkToken from '../middleware/auth.js';
import User from '../models/User.js';
import Contact from '../models/Contact.js';
import { body, validationResult } from 'express-validator';

//@route    GET api/contacts
//@desc     GET all users contacts
//@access   Private
router.get('/', checkToken, async (req, res) => {
  // res.send('Get all contacts');

  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/contacts
//@desc     ADD new contact
//@access   Private
router.post('/', (req, res) => {
  res.send('Add contact');
});

//@route    PUt api/contacts/:id
//@desc     Update contact
//@access   Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

//@route    DELETE api/:id
//@desc     Delete contact
//@access   Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

export default router;
// module.exports = router;
