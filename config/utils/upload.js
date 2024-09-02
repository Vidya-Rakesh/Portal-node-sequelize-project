// upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
   console.log('Destination:', './uploads');
    cb(null, './uploads'); // Folder where files will be stored
  },
  filename:  (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// Set up file filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

// Initialize upload
const upload = multer({
  storage: storage,
  //fileFilter: fileFilter,
 // limits: { fileSize: 5 * 1024 * 1024 } // 5 MB file size limit
});



module.exports = upload;



