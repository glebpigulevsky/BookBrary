const express = require('express');
const connectDB = require('./config/db');
const app = express();
const config = require('config');
const dbGrid = config.get('mongoGridURI');
const mongoose = require('mongoose');

// modules for Socket
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

// modules for download imgs
const path = require('path');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const auth = require('./middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('./models/Post');
const User = require('./models/User');

//Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(methodOverride('_method'));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Create mongo connection
const conn = mongoose.createConnection(dbGrid, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// init gfs
let gfs;
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log('MongoGrid Connected...');
});

// Create storage object
const storage = new GridFsStorage({
  url: dbGrid,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/verify', require('./routes/api/verify'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/adminusers', require('./routes/api/adminusers'));
app.use('/api/photo', require('./routes/api/photo'));
app.use('/api/tags', require('./routes/api/tags'));

// Server static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res, next) => {
    if (req.url.match(/image/) !== null) return next();
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started om port ${PORT}`));

app.get('/api/photo', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({ msg: 'Files not found' });
    } else {
      files.map((file) => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'img/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.json({ files: files });
    }
  });
});

// @route POST /upload
// @desc Uploadss file to db
app.post('/api/upload', upload.single('headerPhoto'), (req, res) => {
  // file is the name from input!!!
  const url =
    'https' + '://' + req.get('host') + '/uploads/' + req.file.filename;
  res.json(url);
});

// @route GET /files
// @desc Display all files in JSON
app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist',
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route   POST api/posts
// @desc    Create a post
// @access  Private
app.post(
  '/api/posts/',
  auth,
  upload.single('headerPhoto'),
  async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    try {
      const user = await User.findById(req.user.id).select('-password');
      console.log(req.body);
      const newPost = new Post({
        header: req.body.header,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        tags: JSON.parse(req.body.tags),
        postImage: req.file.filename,
        genre: req.body.genre,
      });

      newPost.save();

      res.json(newPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET /image/:filename
// @desc  Display Image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'img/png') {
      // Read output to browser
      let readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image',
      });
    }
  });
});

// @route   POST /api/post/:id/chapter
// @desc    Create a chapter to post
// @access  Private
app.post(
  '/api/posts/:id/chapter',
  auth,
  upload.single('headerPhoto'),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      console.log(req.body);
      if (post) {
        let newChapter = new Post({
          text: req.body.text,
          header: req.body.header,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id,
          countChapters: post.chapters.length,
          postImage: req.file.filename,
        });

        post.countChapters += 1;

        post.chapters.push(newChapter);

        await post.save();
      }

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Socket
io.on('connection', (socket) => {
  socket.on('Input Chat Message', async (msg) => {
    console.log(msg);
    try {
      const post = await Post.findById(msg.post);
      const user = await User.findById(msg.user);
      if (!post) return console.log('Socket Error');
      const newComment = new Post({
        text: msg.text,
        name: user.name,
        avatar: user.avatar,
        user: msg.user,
        date: msg.time,
      });
      post.comments.push(newComment);
      post.save((err, post) => {
        if (err) return res.json({ msg: err.msg });
        return io.emit('Output Chat Message', post);
      });
    } catch (err) {
      console.error(err.message);
    }
  });
});
