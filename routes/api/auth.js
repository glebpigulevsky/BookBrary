const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });

    if(!user) {
      res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]})
    }

  
    const isMatch = await bcrypt.compare( password, user.password);

    if (!isMatch) {
      res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]});
    }

    if(user.isBlocked) {
      console.log('blocked');
      res.status(400).json({ errors: [{ msg: 'Please, verify your email' }]});
    }

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
        isBlocked: user.isBlocked
      }
    }
    

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      res.json({token});
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
  
  
});

module.exports = router;