import React, { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

const ExplorePosts = ({ onBack, onCreate, onSelectPost }) => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await apiRequest("/api/posts");
        setPosts(data?.posts || []);
        setStatus({ loading: false, error: "" });
      } catch (err) {
        setStatus({ loading: false, error: err.message });
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="bb-bg min-h-screen bb-text px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between sm:mb-10">
          <div>
            <h1 className="font-display text-3xl font-semibold">Explore Posts</h1>
            <p className="mt-2 bb-muted">Read what the community is sharing.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold bb-text transition hover:border-white/30 hover:bg-white/15"
              type="button"
              onClick={onBack}
            >
              Back to Home
            </button>
            <button
              className="rounded-full bg-gradient-to-r from-amber-300 to-cyan-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:from-amber-200 hover:to-cyan-100"
              type="button"
              onClick={onCreate}
            >
              Start Writing
            </button>
          </div>
        </header>

        {status.loading && (
          <p className="bb-muted">Loading posts...</p>
        )}

        {status.error && (
          <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
            {status.error}
          </p>
        )}

        {!status.loading && !posts.length && !status.error && (
          <p className="bb-muted">No posts yet. Be the first to write one.</p>
        )}

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <button
              key={post._id}
              type="button"
              className="bb-doc text-left transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
              onClick={() => onSelectPost(post._id)}
            >
              <div className="bb-doc-header">
                <span className="bb-doc-title">{post.title}</span>
                <span className="bb-doc-meta">{post.status}</span>
              </div>
              <p className="bb-doc-body">{post.description}</p>
              <div className="bb-doc-footer">
                {post.tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bb-doc-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="bb-muted-2 text-sm">No tags</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePosts;
