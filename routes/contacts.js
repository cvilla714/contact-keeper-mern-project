const express = require('express');
const router = express.Router();

//@route    GET api/contacts
//@desc     GET all users contacts
//@access   Private
router.get('/', (req, res) => {
  res.send('Get all contacts');
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

// export default router;
module.exports = router;
