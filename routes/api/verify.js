const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// @route   GET api/verify
// @desc    Update isBlocked user
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    );
    setTimeout(() => {
      res.redirect('https://polar-brook-48860.herokuapp.com/login');
    }, 2000);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
