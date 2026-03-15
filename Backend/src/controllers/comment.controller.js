const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

/**
 * @name createComment
 * @desc Add a comment to a post
 * @route POST /api/posts/:id/comments
 * @access Private
 */
async function createComment(req, res) {
  const { id } = req.params;
  const { content } = req.body || {};

  if (!content) {
    return res.status(400).json({ message: "Comment content is required" });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const comment = await Comment.create({
    post: id,
    author: req.user.id,
    content,
  });

  res.status(201).json({ message: "Comment added", comment });
}

/**
 * @name getCommentsForPost
 * @desc Get comments for a post
 * @route GET /api/posts/:id/comments
 * @access Private
 */
async function getCommentsForPost(req, res) {
  const { id } = req.params;

  const comments = await Comment.find({ post: id })
    .populate("author", "username avatar")
    .sort({ createdAt: -1 });

  res.status(200).json({ count: comments.length, comments });
}

module.exports = {
  createComment,
  getCommentsForPost,
};
