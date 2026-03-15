const Post = require("../models/post.model");
const { uploadFile } = require("../services/imageKit");

/**
 * @name createPost
 * @desc Create a new post
 * @route POST /api/posts
 * @access Private
 */
async function createPost(req, res) {
  const { title, description, status } = req.body || {};
  let { imageUrl, tags } = req.body || {};

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  if (tags && typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      tags = Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      tags = [];
    }
  }

  if (req.file) {
    const uploaded = await uploadFile(req.file);
    imageUrl = uploaded.url;
  }

  const post = await Post.create({
    title,
    description,
    imageUrl: imageUrl || "",
    tags: Array.isArray(tags) ? tags : [],
    status: status || "draft",
    author: req.user.id,
  });

  res.status(201).json({ message: "Post created successfully", post });
}

/**
 * @name getAllPosts
 * @desc Get all posts
 * @route GET /api/posts
 * @access Public
 */
async function getAllPosts(req, res) {
  const { status, author } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (author) filter.author = author;

  const posts = await Post.find(filter).sort({ createdAt: -1 });

  res.status(200).json({ count: posts.length, posts });
}

/**
 * @name getPostById
 * @desc Get single post by id
 * @route GET /api/posts/:id
 * @access Public
 */
async function getPostById(req, res) {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.status(200).json({ post });
}

/**
 * @name updatePost
 * @desc Update a post (author only)
 * @route PUT /api/posts/:id
 * @access Private
 */
async function updatePost(req, res) {
  const { id } = req.params;
  let { tags } = req.body || {};

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed to update this post" });
  }

  if (tags && typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      tags = Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      tags = [];
    }
  }

  if (req.file) {
    const uploaded = await uploadFile(req.file);
    req.body.imageUrl = uploaded.url;
  }

  const allowedFields = ["title", "description", "imageUrl", "tags", "status"];
  const updates = {};

  allowedFields.forEach((field) => {
    if (field === "tags" && tags !== undefined) {
      updates[field] = Array.isArray(tags) ? tags : [];
    } else if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const updatedPost = await Post.findByIdAndUpdate(id, updates, { new: true });

  res.status(200).json({ message: "Post updated successfully", post: updatedPost });
}

/**
 * @name deletePost
 * @desc Delete a post (author only)
 * @route DELETE /api/posts/:id
 * @access Private
 */
async function deletePost(req, res) {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed to delete this post" });
  }

  await Post.findByIdAndDelete(id);

  res.status(200).json({ message: "Post deleted successfully" });
}

/**
 * @name getMyPosts
 * @desc Get posts created by logged-in user
 * @route GET /api/posts/me
 * @access Private
 */
async function getMyPosts(req, res) {
  const posts = await Post.find({ author: req.user.id }).sort({ createdAt: -1 });

  res.status(200).json({ count: posts.length, posts });
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
};
