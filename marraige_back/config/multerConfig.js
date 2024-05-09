const fs = require('fs').promises;
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
};

const dir = 'public/uploads';


const storage = multer.diskStorage({
  destination: async (req, file, callback,userEmail) => {
    try {
      await fs.mkdir(dir, { recursive: true });
      callback(null, dir);
    } catch (error) {
      callback(error, dir);
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + '.' + extension);
  },
});

const fileFilter = (req, file, cb) => {
  if (!MIME_TYPES[file.mimetype]) {
    cb('File must be an image', false);
  } else {
    cb(null, true);
  }
};


module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 2000000,
  },
  fileFilter,
}).single('image');
