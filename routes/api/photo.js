const express = require('express');
const router = express.Router();
const gfs = require('../../server');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const config = require('config');
const dbGrid = config.get('mongoGridURI');
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

module.exports = router;
