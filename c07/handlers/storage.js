const fs = require("fs");
const makeId = require("../helper/strings");

// 8bit = 1 byte
// 1024 byte = 1KB
// 1024KB = 1MB
// 1024MB = 1GB

// 1024 * 1024 = 1MB
// 10 * 1024 * 1024 = 10MB
const MAX_FILESIZE = 10 * 1024 * 1024;
const ALLOWED_FILETYPES = ["image/jpeg", "image/jpg", "image/png"]; // format na mimetype

const upload = async (req, res) => {
  console.log("files", req.files);
  // timeline.png
  // da ja smestime vo uploads/user_1/timeline_0121.png

  if (!req.files) {
    return res.status(400).send("No file was uploaded!");
  }

  if (MAX_FILESIZE < req.files.document.size) {
    // document ni e hard-kodiran kluc
    return res.status(400).send("File exceeds max file size!");
  }

  if (!ALLOWED_FILETYPES.includes(req.files.document.mimetype)) {
    return res.status(400).send("File type not allowed!");
  }

  const userDir = `user_${req.auth.id}`; // imeto na folderot na korisnikot vo uploads
  const userDirPath = `${__dirname}/../uploads/${userDir}`; // Celata pateka /uploads/user_12345

  if (!fs.existsSync(userDirPath)) {
    fs.mkdirSync(userDirPath);
  }

  const newFileName = req.files.document.name.split("."); // timeline.png
  // newFileName = ["timeline", "png"]
  // newFileName[0] =  "timeline"
  // newFileName[1] =  "png"

  const fileName = `${newFileName[0]}_${makeId(6)}.${newFileName[1]}`; // timeline_012ABC.png
  const filePath = `${userDirPath}/${fileName}`; // /uploads/user_12345/timeline_012ABC.png

  req.files.document.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send("Internal server error!");
    }

    return res.status(200).send({ file_name: fileName });
  });
};

const download = async (req, res) => {
  const userDir = `user_${req.auth.id}`;
  const userDirPath = `${__dirname}/../uploads/${userDir}`;

  const filePath = `${userDirPath}/${req.params.filename}`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  res.download(filePath);
};

module.exports = {
  upload,
  download,
};
