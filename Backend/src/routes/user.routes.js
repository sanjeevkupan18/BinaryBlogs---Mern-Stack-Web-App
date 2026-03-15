const express = require("express");
const multer = require("multer");
const authUser = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

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
 * @route POST /api/users/avatar
 * @desc Upload avatar image
 * @access Private
 */
userRouter.post("/avatar", authUser, upload.single("avatar"), userController.uploadAvatar);

module.exports = userRouter;
