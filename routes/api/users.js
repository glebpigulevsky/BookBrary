const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const nodemailer = require("nodemailer");

//Create  SMTP Server details 
const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: config.get('smtpServer.account'),
      pass: config.get('smtpServer.password')
  }
});

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({min: 4})
], async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });

    if(user) {
      res.status(400).json({ errors: [{ msg: 'User already exists' }]})
    }

    // Get users gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })

    user = new User({
      name,
      email,
      avatar,
      password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

        // Send verify email
        const host = req.get('host');
        const link = "http://" + req.get('host') + "/api/verify/" + user.id;
    
        const mailOptions = {
          to : user.email,
          subject : "Please confirm your Email account",
          html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
        }
    
        smtpTransport.sendMail(mailOptions, function(error, response){
          if(error){
                 console.log(error);
             res.end("error");
          }else{
                 console.log("Message sent: " + response);
             res.end("sent");
              }
     });

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
        isBlocked: true
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