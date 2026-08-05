const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  convertFile,
  pdfToImage,
  imageToPdf,
} = require("../controllers/convert.controller");

const router = express.Router();

const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    cb(
      null,
      Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

// Generic image -> image conversion (used by ImageConverter.tsx)
router.post(
  "/",
  upload.single("file"),
  convertFile
);

// PDF -> JPG (returns a zip of the converted pages)
router.post(
  "/pdf-to-image",
  upload.single("file"),
  pdfToImage
);

// JPG -> PDF
router.post(
  "/image-to-pdf",
  upload.single("file"),
  imageToPdf
);

module.exports = router;