const multer = require('multer');
const fs = require('fs');
const otpGenerator = require('otp-generator');

const imgDir = 'src/view/img';
const audDir = 'src/view/audio';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const audioExtensions = /\.(mp3|wav|ogg)$/i;
    const fileExtension = audioExtensions.test(file.originalname);

    let targetDir = imgDir; // Default directory for images

    if (fileExtension) {
      targetDir = audDir; // Use audio directory for audio files
    }

    // Create the directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    cb(null, targetDir);
  },
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];

    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
