const express = require('express');
const router = express.Router();
const Tag = require('../../models/Tag');
const auth = require('../../middleware/auth');

// @route   GET api/tags
// @desc    Get all tags
// @access  Public
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tags
// @desc    Save new tag
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const tag = await Tag.findOne({ value: req.body.tag });
    if (tag) {
      return res.status(303).json({ msg: 'Tag already exist' });
    }
    const newTag = new Tag({
      value: req.body.tag,
      label: req.body.tag,
      count: 1,
    });
    await newTag.save();
    return res.json(newTag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  return res.json({ msg: 'endpoint works' });
});

// @route   POST api/tags/:id
// @desc    Change counter of tag +1
// @access  Private
router.post('/:id', auth, async (req, res) => {
  try {
    const tag = await Tag.findOne({ _id: req.params.id });
    if (!tag) {
      return res.status(303).json({ msg: 'Tag already exist' });
    }
    tag.count += 1;
    await tag.save();
    return res.json(tag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  return res.json({ msg: 'endpoint works' });
});

// @route   POST api/tags/:id
// @desc    Change counter of tag -1
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const tag = await Tag.findOne({ _id: req.params.id });
    if (!tag) {
      return res.status(303).json({ msg: 'Tag already exist' });
    }
    tag.count -= 1;
    await tag.save();
    return res.json(tag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  return res.json({ msg: 'endpoint works' });
});

module.exports = router;
