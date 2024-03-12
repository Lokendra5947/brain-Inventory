const multer = require("multer")
const path = require("path")

// storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // for genrate random name for file 
        let genrateRandomFileNAme = Date.now()+ Math.floor(Math.random())
        // console.log(genrateRandomFileNAme)
    cb(null,genrateRandomFileNAme+file.originalname)
    }
  })
  const upload = multer({ 
    storage: storage ,
    limits: {
      fileSize: 1024 * 1024 * 5 
    },
    fileFilter: function(req, file, cb) {
      const filetypes = /jpeg|jpg|png|gif/;
      // Check the file extension
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      // Check MIME type
      const mimetype = filetypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, gif)'));
      }
    }
  })

  module.exports = {upload}