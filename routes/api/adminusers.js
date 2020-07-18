const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   Get api/adminusers
// @desc    Get all users 
// @access  Private Admin!
router.get('/', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(400).json({ msg: 'Your are not Admin. Stop hacking!' });
    }
    
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// @route   PUT /api/adminUsers/:id
// @desc    Update user
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { isAdmin, isBlocked } = req.body;

  // Build User object
  const userField = {isAdmin, isBlocked};
  
  try {
    let user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({msg: 'Contact not found' });
    user = await User.findByIdAndUpdate( 
      req.params.id, 
      { $set: userField }, 
      { new: true } 
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   Delete api/adminUsers/:id
// @desc    Delete user
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if(!user) return res.status(404).json({msg: 'Contact not found' });


    await User.findByIdAndDelete(req.params.id);
    
    res.json({ msg: 'User Delete' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;