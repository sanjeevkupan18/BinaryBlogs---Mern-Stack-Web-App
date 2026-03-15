const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');
const multer = require('multer');
const authUser = require('../middlewares/auth.middleware');

const upload = multer({ storage: multer.memoryStorage() });

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register', upload.single('avatar'), authController.registerUser)

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post('/login', upload.none(), authController.loginUser)

/**
 * @route GET /api/auth/logout
 * @desc Logout a user
 * @access Public
 */
authRouter.get('/logout', authController.logoutUser)

/**
 * @route GET /api/auth/me
 * @desc Get current logged in user
 * @access Private
 */
authRouter.get('/me', authUser, authController.getMe)

module.exports = authRouter;
