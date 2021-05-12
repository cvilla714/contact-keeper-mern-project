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
router.post(
  '/',
  [checkToken, [body('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    // res.send('Add contact');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

//@route    PUt api/contacts/:id
//@desc     Update contact
//@access   Private
router.put('/:id', checkToken, async (req, res) => {
  // res.send('Update contact');
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Validating the user owns the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

//@route    DELETE api/:id
//@desc     Delete contact
//@access   Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

export default router;
// module.exports = router;
