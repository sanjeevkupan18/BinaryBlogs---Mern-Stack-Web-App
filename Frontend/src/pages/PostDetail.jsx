import React, { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

const PostDetail = ({ postId, user, onBack, onLogin }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });
  const [commentText, setCommentText] = useState("");
  const [commentStatus, setCommentStatus] = useState({ loading: false, error: "" });
  const [editMode, setEditMode] = useState(false);
  const [editState, setEditState] = useState({
    title: "",
    description: "",
    tags: "",
    status: "draft",
    image: null,
  });
  const [editStatus, setEditStatus] = useState({ loading: false, error: "" });

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await apiRequest(`/api/posts/${postId}`);
        const loadedPost = data?.post || null;
        setPost(loadedPost);
        if (loadedPost) {
          setEditState({
            title: loadedPost.title || "",
            description: loadedPost.description || "",
            tags: Array.isArray(loadedPost.tags) ? loadedPost.tags.join(", ") : "",
            status: loadedPost.status || "draft",
            image: null,
          });
        }
      } catch (err) {
        setStatus({ loading: false, error: err.message });
        return;
      }

      try {
        const commentData = await apiRequest(`/api/posts/${postId}/comments`);
        setComments(commentData?.comments || []);
      } catch (err) {
        // keep comments empty on error
      }

      setStatus({ loading: false, error: "" });
    };

    loadPost();
  }, [postId]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!commentText.trim()) return;

    setCommentStatus({ loading: true, error: "" });
    try {
      const data = await apiRequest(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentText }),
      });

      setComments((prev) => [data.comment, ...prev]);
      setCommentText("");
      setCommentStatus({ loading: false, error: "" });
    } catch (err) {
      setCommentStatus({ loading: false, error: err.message });
    }
  };

  const getUserId = () => user?.id || user?._id || "";
  const getPostAuthorId = () => {
    if (!post?.author) return "";
    if (typeof post.author === "string") return post.author;
    return post.author._id || "";
  };

  const isOwner = getUserId() && getUserId() === getPostAuthorId();

  const handleEditChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setEditState((prev) => ({ ...prev, image: files?.[0] || null }));
      return;
    }
    setEditState((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!post?._id) return;
    setEditStatus({ loading: true, error: "" });

    try {
      const formData = new FormData();
      formData.append("title", editState.title);
      formData.append("description", editState.description);
      formData.append("status", editState.status);

      const tagsArray = editState.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      if (tagsArray.length) {
        formData.append("tags", JSON.stringify(tagsArray));
      }

      if (editState.image) {
        formData.append("image", editState.image);
      }

      const data = await apiRequest(`/api/posts/${post._id}`, {
        method: "PUT",
        body: formData,
      });

      setPost(data?.post || post);
      setEditMode(false);
      setEditStatus({ loading: false, error: "" });
    } catch (err) {
      setEditStatus({ loading: false, error: err.message });
    }
  };

  const handleDelete = async () => {
    if (!post?._id) return;
    const ok = window.confirm("Delete this post? This cannot be undone.");
    if (!ok) return;
    try {
      await apiRequest(`/api/posts/${post._id}`, { method: "DELETE" });
      onBack();
    } catch (err) {
      setEditStatus({ loading: false, error: err.message });
    }
  };

  return (
    <div className="bb-bg min-h-screen bb-text px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">Post</h1>
            <p className="mt-2 bb-muted">Read the full story and join the discussion.</p>
          </div>
          <button
            className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold bb-text transition hover:border-white/30 hover:bg-white/15"
            type="button"
            onClick={onBack}
          >
            Back to Posts
          </button>
        </header>

        {status.loading && <p className="bb-muted">Loading post...</p>}
        {status.error && (
          <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
            {status.error}
          </p>
        )}

        {post && (
          <article className="bb-doc-detail">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <h2 className="bb-doc-title text-3xl">{post.title}</h2>
              {isOwner && (
                <div className="flex gap-2">
                  <button
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold bb-text transition hover:border-white/30 hover:bg-white/15"
                    type="button"
                    onClick={() => setEditMode((prev) => !prev)}
                  >
                    {editMode ? "Cancel" : "Edit"}
                  </button>
                  <button
                    className="rounded-full border border-red-400/40 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-200 transition hover:border-red-400/70"
                    type="button"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {post.imageUrl && (
              <div className="mt-6 flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="aspect-square w-full max-w-xs object-contain sm:max-w-sm md:max-w-md"
                />
              </div>
            )}
            <p className="bb-doc-body mt-6 text-base">{post.description}</p>
            {post.tags?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="bb-doc-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}

            {isOwner && editMode && (
              <form className="mt-8 space-y-4" encType="multipart/form-data" onSubmit={handleUpdate}>
                <div>
                  <label className="text-sm font-semibold bb-muted">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="bb-input mt-2 focus:border-amber-300"
                    value={editState.title}
                    onChange={handleEditChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold bb-muted">Description</label>
                  <textarea
                    name="description"
                    className="bb-input mt-2 min-h-[140px] resize-none focus:border-amber-300"
                    value={editState.description}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold bb-muted">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      className="bb-input mt-2 focus:border-amber-300"
                      value={editState.tags}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold bb-muted">Status</label>
                    <select
                      name="status"
                      className="bb-input mt-2 focus:border-amber-300"
                      value={editState.status}
                      onChange={handleEditChange}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold bb-muted">Replace Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm bb-text file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                    onChange={handleEditChange}
                  />
                </div>
                {editStatus.error && (
                  <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                    {editStatus.error}
                  </p>
                )}
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-amber-300 to-cyan-200 px-6 py-2 text-sm font-semibold text-slate-900 transition hover:from-amber-200 hover:to-cyan-100"
                  disabled={editStatus.loading}
                >
                  {editStatus.loading ? "Updating..." : "Update Post"}
                </button>
              </form>
            )}
          </article>
        )}

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-2xl font-semibold">Comments</h3>
            {!user && (
              <button
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold bb-text transition hover:border-white/30 hover:bg-white/15"
                type="button"
                onClick={onLogin}
              >
                Login to comment
              </button>
            )}
          </div>

          {user && (
            <form className="mb-6 space-y-3" onSubmit={handleCommentSubmit}>
              <textarea
                className="bb-input min-h-[120px] resize-none focus:border-amber-300"
                placeholder="Write your comment..."
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
              />
              {commentStatus.error && (
                <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                  {commentStatus.error}
                </p>
              )}
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-amber-300 to-cyan-200 px-6 py-2 text-sm font-semibold text-slate-900 transition hover:from-amber-200 hover:to-cyan-100"
                disabled={commentStatus.loading}
              >
                {commentStatus.loading ? "Posting..." : "Post Comment"}
              </button>
            </form>
          )}

          <div className="space-y-4">
            {comments.length === 0 && (
              <p className="bb-muted">No comments yet.</p>
            )}
            {comments.map((comment) => (
              <div key={comment._id} className="bb-card rounded-2xl border p-4">
                <div className="mb-2 flex items-center gap-3">
                  <img
                    src={comment?.author?.avatar || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' rx='24' fill='%2310182d'/%3E%3Ccircle cx='60' cy='46' r='20' fill='%23ffb454'/%3E%3Cpath d='M20 104c8-22 28-32 40-32s32 10 40 32' fill='%236ee7ff'/%3E%3C/svg%3E"}
                    alt={comment?.author?.username || "User"}
                    className="h-9 w-9 rounded-full border border-white/20 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold bb-text">
                      {comment?.author?.username || "User"}
                    </p>
                  </div>
                </div>
                <p className="bb-muted">{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostDetail;
