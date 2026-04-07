const multer = require('multer');
const path = require('path')
const {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
  UPLOAD_USER_IMG_DIRECTORY
} = require('../config');




const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_USER_IMG_DIRECTORY)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname);

  if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {
    return cb(new Error('File type not allowed'),
    false);
  }
  cb(null, true);
}


// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   if(!file.mimetype.startsWith('image/')){
//     return cb(new Error('Only image files are allowed'), false)
//   }
//   if(file.size > MAX_FILE_SIZE){
//     return cb(new Error('File too large'), false)
//   }
//   if(!ALLOWED_FILE_TYPES.includes(file.mimetype)){
//     return cb(new Error('File type not allowed'), false)
//   }
//   cb(null, true);
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter
// });

const uploadUserImage = multer({ storage: userStorage,
  limits: {fileSize: MAX_FILE_SIZE, }, 
  fileFilter,
})
module.exports = uploadUserImage;