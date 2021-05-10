import express from 'express';
// const express = require('express');
const router = express.Router();

//@route    POST api/users
//@desc     Register a user
//@access   Public because you need authentication
router.post('/', (req, res) => {
  res.send('Register a user');
});

export default router;
// module.exports = router;
