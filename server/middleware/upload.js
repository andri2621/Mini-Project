const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "C:/MINI PROJECTTTTTTTT/MPCOMM/client/assets/images/");
    // console.log(__basedir);

  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    const foto = Date.now() + '-' + file.originalname
    console.log(foto);

    cb(null, foto);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
