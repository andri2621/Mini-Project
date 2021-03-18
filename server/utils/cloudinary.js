const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: 'codeid',
  api_key: '353246269428416',
  api_secret: 'XKAOQ-zFiXM4bNv-aNcO7nTmHAE',
});

module.exports = cloudinary;
