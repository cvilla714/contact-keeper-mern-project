const express = require('express');
const router = express.Router();
//@route    GET api/auth
//@desc     Get logged in user
//@access   Private  because you need authentication
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

//@route    POST api/auth
//@desc     Auth user & get token
//@access   Publick
router.post('/', (req, res) => {
  res.send('Get logged in user');
});

// export default router;
module.exports = router;
