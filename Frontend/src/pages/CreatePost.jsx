import React, { useState } from "react";
import { apiRequest } from "../lib/api";

const CreatePost = ({ onBack, onViewPosts }) => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    tags: "",
    status: "draft",
    image: null,
  });
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setFormState((prev) => ({ ...prev, image: files?.[0] || null }));
      return;
    }
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    try {
      const formData = new FormData();
      formData.append("title", formState.title);
      formData.append("description", formState.description);
      formData.append("status", formState.status);

      const tagsArray = formState.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      if (tagsArray.length) {
        formData.append("tags", JSON.stringify(tagsArray));
      }

      if (formState.image) {
        formData.append("image", formState.image);
      }

      await apiRequest("/api/posts/create-post", {
        method: "POST",
        body: formData,
      });

      setStatus({ loading: false, error: "", success: "Post created successfully." });
      setFormState({ title: "", description: "", tags: "", status: "draft", image: null });
      if (onViewPosts) {
        setTimeout(() => onViewPosts(), 600);
      }
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: "" });
    }
  };

  return (
    <div className="bb-bg min-h-screen bb-text px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">Create a post</h1>
            <p className="mt-2 bb-muted">Share your ideas with BinaryBlogs.</p>
          </div>
          <button
            className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold bb-text transition hover:border-white/30 hover:bg-white/15"
            type="button"
            onClick={onBack}
          >
            Back to Home
          </button>
        </header>

        <div className="bb-card mx-auto max-w-2xl rounded-3xl border p-8 shadow-xl">
          <form className="space-y-5" encType="multipart/form-data" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-semibold bb-muted">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Give your post a title"
                className="bb-input mt-2 focus:border-amber-300"
                value={formState.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-semibold bb-muted">Description</label>
              <textarea
                name="description"
                placeholder="Write your story"
                className="bb-input mt-2 min-h-[160px] resize-none focus:border-amber-300"
                value={formState.description}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold bb-muted">Tags</label>
                <input
                  type="text"
                  name="tags"
                  placeholder="mern, backend, thoughts"
                  className="bb-input mt-2 focus:border-amber-300"
                  value={formState.tags}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm font-semibold bb-muted">Status</label>
                <select
                  name="status"
                  className="bb-input mt-2 focus:border-amber-300"
                  value={formState.status}
                  onChange={handleChange}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold bb-muted">Cover Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm bb-text file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                onChange={handleChange}
              />
            </div>
            {status.error && (
              <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                {status.error}
              </p>
            )}
            {status.success && (
              <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
                {status.success}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-amber-300 to-cyan-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:from-amber-200 hover:to-cyan-100"
              disabled={status.loading}
            >
              {status.loading ? "Publishing..." : "Publish Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
