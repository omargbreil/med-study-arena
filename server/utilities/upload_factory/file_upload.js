const multer = require("multer");
const AppError = require("../handelError/appErrorClass");

const imgType= ['image/jpg' , 'image/png' , 'image/jpeg'];
const pdfType=['application/pdf'];
const videoType=['video/x-flv' ,'application/x-mpegURL','video/mp4'];

let mix = () => {
  const storage = multer.diskStorage({});

  function fileFilter(req, file, cb) {
    cb(null,true)
  };

  const upload = multer({ storage, fileFilter });
  return upload;
};
let s_video = () => {
  const storage = multer.diskStorage({});

  function fileFilter(req, file, cb) {
    if (videoType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError("Accept only videos", 400), false);
    ;}
  };

  const upload = multer({ storage, fileFilter });
  return upload;
};



// ____________________________________________

let s_image = () => {
  const storage = multer.diskStorage({});

  function fileFilter(req, file, cb) {
    if (imgType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError("Accept only images ", 400), false);
    ;}
  };

  const upload = multer({ storage, fileFilter });
  return upload;
}


let s_pdf = () => {
  const storage = multer.diskStorage({});

  function fileFilter(req, file, cb) {
    if (pdfType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError("Accept only pdfs ", 400), false);
    ;}
  };

  const upload = multer({ storage, fileFilter });
  return upload;
}
module.exports.uploadMixFileds = (arrayFields) => mix().fields(arrayFields);

module.exports.uploadSingleVideo = (fieldName) => s_video().single(fieldName);
module.exports.uploadSingleImage = (fieldName) => s_image().single(fieldName);
module.exports.uploadSinglePdf = (fieldName) => s_pdf().single(fieldName);






