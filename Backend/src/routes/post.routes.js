const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');
const multer = require('multer');
const authUser = require('../middlewares/auth.middleware');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

/**
 * @route POST /api/posts
 * @desc Create a new post
 * @access Private
 */
postRouter.post('/create-post', authUser, upload.single('image'), postController.createPost);

/**
 * @route GET /api/posts
 * @desc Get all posts
 * @access Public
 */
/**
 * @route GET /api/posts/me
 * @desc Get posts created by logged-in user
 * @access Private
 */
postRouter.get('/me', authUser, postController.getMyPosts);

/**
 * @route GET /api/posts
 * @desc Get all posts
 * @access Public
 */
postRouter.get('/', postController.getAllPosts);

/**
 * @route POST /api/posts/:id/comments
 * @desc Add a comment to a post
 * @access Private
 */
postRouter.post('/:id/comments', authUser, commentController.createComment);

/**
 * @route GET /api/posts/:id/comments
 * @desc Get comments for a post
 * @access Public
 */
postRouter.get('/:id/comments', commentController.getCommentsForPost);

/**
 * @route PUT /api/posts/:id
 * @desc Update a post
 * @access Private
 */
postRouter.put('/:id', authUser, upload.single('image'), postController.updatePost);

/**
 * @route DELETE /api/posts/:id
 * @desc Delete a post
 * @access Private
 */
postRouter.delete('/:id', authUser, postController.deletePost);

/**
 * @route GET /api/posts/:id
 * @desc Get a single post by id
 * @access Public
 */
postRouter.get('/:id', postController.getPostById);

module.exports = postRouter;
