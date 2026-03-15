const express = require("express");
const multer = require("multer");
const authUser = require("../middlewares/auth.middleware");
const uploadController = require("../controllers/upload.controller");

const uploadRouter = express.Router();

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

/**
 * @route POST /api/upload
 * @desc Upload an image
 * @access Private
 */
uploadRouter.post("/", authUser, upload.single("image"), uploadController.uploadImage);

module.exports = uploadRouter;
