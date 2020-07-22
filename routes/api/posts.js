const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
//const upload = require('../../server');

// // @route   POST api/posts
// // @desc    Create a post
// // @access  Private
// router.post(
//   '/',
//   [
//     auth,
//     check('text', 'Text is required').not().isEmpty(),
//     check('header', 'Header is required').not().isEmpty(),
//   ],
//   upload.single('headerPhoto'),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const url = req.protocol + '://' + req.get('host');

//     try {
//       const user = await User.findById(req.user.id).select('-password');

//       const newPost = new Post({
//         header: req.body.header,
//         text: req.body.text,
//         name: user.name,
//         avatar: user.avatar,
//         user: req.user.id,
//         postImage: url + '/uploads/' + req.file.filename,
//       });

//       newPost.save();

//       res.json(newPost);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// // @route   POST api/posts
// // @desc    Create a post
// // @access  Private
// router.post(
//   '/',
//   [
//     auth,
//     check('text', 'Text is required').not().isEmpty(),
//     check('header', 'Header is required').not().isEmpty(),
//   ],
//   upload.single('headerPhoto'),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const url = req.protocol + '://' + req.get('host');

//     try {
//       const user = await User.findById(req.user.id).select('-password');

//       const newPost = new Post({
//         header: req.body.header,
//         text: req.body.text,
//         name: user.name,
//         avatar: user.avatar,
//         user: req.user.id,
//         postImage: url + '/uploads/' + req.file.filename,
//       });

//       newPost.save();

//       res.json(newPost);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// @route   POST api/posts/:id
// @desc    Update a post
// @access  Private
router.post(
  '/:id',
  [
    auth,
    check('text', 'Text is required').not().isEmpty(),
    check('header', 'Header is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { header, text, tags, genre } = req.body;
    const postFields = {};

    if (header) postFields.header = header;
    if (text) postFields.text = text;
    if (tags) postFields.tags = tags;
    if (genre) postFields.genre = genre;

    try {
      let post = await Post.findById(req.params.id);

      if (post) {
        // Update
        post = await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $set: postFields },
          { new: true }
        );

        return res.json(post);
      }

      res.json(newPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// // @route   POST api/post/:id/chapter
// // @desc    Add chapter to post
// // @access  Private
// router.post(
//   '/:id/chapter',
//   [
//     auth,
//     check('text', 'Text is required').not().isEmpty(),
//     check('header', 'Header is required').not().isEmpty(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const { header, text } = req.body;

//     try {
//       const user = await User.findById(req.user.id).select('-password');
//       const post = await Post.findById(req.params.id);

//       if (post) {
//         let newChapter = new Post({
//           text: text,
//           header: header,
//           name: user.name,
//           avatar: user.avatar,
//           user: req.user.id,
//           countChapters: post.chapters.length,
//         });

//         post.countChapters += 1;

//         post.chapters.push(newChapter);

//         await post.save();
//       }

//       res.json(post);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/post
// @desc    Get post by id
// @access  Public

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Checj user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorizid' });
    }
    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
  '/comment/:id',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      const newComment = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      post.comments.push(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //Make sure comments exist
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist ' });
    }

    //Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove Index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/rating/:id
// @desc    Rating on a post
// @access  Private
router.post('/rating/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if the post has already been rated by this user
    if (
      post.rating.filter((rat) => rat.user.toString() === req.user.id).length >
      0
    ) {
      const updIndex = post.rating
        .map((rat) => rat.user.toString())
        .indexOf(req.user.id);
      post.rating[updIndex].rating = req.body.rating;
      post.averageRating =
        post.rating.reduce((p, c) => {
          return p + c.rating;
        }, 0) / post.rating.length;
      await post.save();
      res.json(post);
      return;
    }
    post.rating.unshift({ user: req.user.id, rating: req.body.rating });
    post.averageRating =
      post.rating.reduce((p, c) => {
        return p + c.rating;
      }, 0) / post.rating.length;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/user/:id
// @desc    Get current user posts
// @access  Public
router.get('/user/:id', auth, async (req, res) => {
  try {
    let posts = await Post.find().sort({ date: -1 });
    let userPosts = posts.filter(
      (post) => post.user.toString() === req.params.id
    );

    res.json(userPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
