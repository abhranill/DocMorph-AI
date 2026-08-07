const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
  convertFile,
} = require("../controllers/convert.controller");

// ==============================
// Multer Storage
// ==============================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

// ==============================
// Converter Route
// ==============================

router.post(
  "/",
  upload.single("file"),
  convertFile
);

module.exports = router;