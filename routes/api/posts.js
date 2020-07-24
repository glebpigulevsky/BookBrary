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

// @route   DELETE api/posts/:id_post/chapter/:id
// @desc    delete chapter to post
// @access  Private
router.delete('/:id_post/chapter/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id_post);

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorizid' });
    }

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    post.chapters.filter((chapter) => chapter._id !== req.params.id);

    // Get remove Index
    const removeIndex = post.chapters
      .map((chapter) => chapter._id.toString())
      .indexOf(req.params.id);

    post.chapters.splice(removeIndex, 1);

    post.countChapters -= 1;

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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

// @route   POST api/posts/:id/chapter/:chapter_id
// @desc    Update a chapter
// @access  Private
router.post(
  '/:id/chapter/:chapter_id',
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
    const { header, text } = req.body;
    const postFields = {};

    if (header) postFields.header = header;
    if (text) postFields.text = text;

    try {
      let post = await Post.findById(req.params.id);

      if (post) {
        // Update
        post.chapters.map((chapter) => {
          if (chapter._id.toString() === req.params.chapter_id) {
            chapter.header = header;
            chapter.text = text;
          }
        });
        await post.save();
        return res.json(post);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/posts/:id/chapter/:chapter_id/up
// @desc    Move chapter up
// @access  Private
router.post(
  '/:id/chapter/:chapter_id/up',

  auth,
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);

      if (post) {
        // Get remove Index
        const movedIndex = post.chapters
          .map((chapter) => chapter._id.toString())
          .indexOf(req.params.chapter_id);
        if (
          Math.min(movedIndex, movedIndex - 1) < 0 ||
          Math.max(movedIndex, movedIndex - 1) >= post.chapters.length
        ) {
          console.error('Out of range');
          return null;
        }

        const t = post.chapters.splice(movedIndex, 1);
        post.chapters.splice(movedIndex - 1, 0, t[0]);

        await post.save();
        return res.json(post);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/posts/:id/chapter/:chapter_id/down
// @desc    Move chapter down
// @access  Private
router.post(
  '/:id/chapter/:chapter_id/down',

  auth,
  async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);

      if (post) {
        // Get remove Index
        const movedIndex = post.chapters
          .map((chapter) => chapter._id.toString())
          .indexOf(req.params.chapter_id);
        if (
          Math.min(movedIndex, movedIndex + 1) < 0 ||
          Math.max(movedIndex, movedIndex + 1) >= post.chapters.length
        ) {
          console.error('Out of range');
          return null;
        }

        const t = post.chapters.splice(movedIndex, 1);
        post.chapters.splice(movedIndex + 1, 0, t[0]);

        await post.save();
        return res.json(post);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/posts/:id/chapter/:chapter_id/like
// @desc    Like a chapter
// @access  Private
router.put('/:id/chapter/:chapter_id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked

    const likedIndex = post.chapters
      .map((chapter) => chapter._id.toString())
      .indexOf(req.params.chapter_id);

    if (
      post.chapters[likedIndex].likes.filter(
        (like) => like.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.chapters[likedIndex].likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.chapters[likedIndex]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/:id/chapter/:chapter_id/unlike
// @desc    UNLike a chapter
// @access  Private
router.put('/:id/chapter/:chapter_id/unlike', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const unlikedIndex = post.chapters
      .map((chapter) => chapter._id.toString())
      .indexOf(req.params.chapter_id);

    // Check if the post has already been liked
    if (
      post.chapters[unlikedIndex].likes.filter(
        (like) => like.user.toString() === req.user.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index of like
    const removeIndex = post.chapters[unlikedIndex].likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.chapters[unlikedIndex].likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.chapters[unlikedIndex]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const swapArray = function (arr, oldPlace, newPlace) {
  // Check borders in array
  if (
    Math.min(oldPlace, newPlace) < 0 ||
    Math.max(oldPlace, newPlace) >= arr.length
  ) {
    console.error('Out of range');
    return null;
  }
  const item = arr.splice(oldPlace, 1);
  arr.splice(newPlace > 0 ? newPlace - 1 : 0, 0, item[0]);
  return arr;
};

module.exports = router;
