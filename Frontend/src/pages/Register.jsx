import React, { useState } from "react";
import { apiRequest } from "../lib/api";

const Register = ({ onBack, onSuccess }) => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "avatar") {
      setFormState((prev) => ({ ...prev, avatar: files?.[0] || null }));
      return;
    }
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    try {
      const formData = new FormData();
      formData.append("username", formState.username);
      formData.append("email", formState.email);
      formData.append("password", formState.password);
      if (formState.avatar) {
        formData.append("avatar", formState.avatar);
      }

      const data = await apiRequest("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      setStatus({ loading: false, error: "", success: "Account created successfully." });
      if (onSuccess) {
        onSuccess(data?.user || null);
      }
      setTimeout(() => onBack(), 800);
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: "" });
    }
  };

  return (
    <div className="bb-bg min-h-screen bb-text px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">Create account</h1>
            <p className="mt-2 bb-muted">Join BinaryBlogs and start publishing.</p>
          </div>
          <button
            className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold bb-text transition hover:border-white/30 hover:bg-white/15"
            type="button"
            onClick={onBack}
          >
            Back to Home
          </button>
        </header>

        <div className="bb-card mx-auto max-w-md rounded-3xl border p-8 shadow-xl">
          <form className="space-y-5" encType="multipart/form-data" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-semibold bb-muted">Username</label>
              <input
                type="text"
                name="username"
                placeholder="sanjucoding"
                className="bb-input mt-2 focus:border-amber-300"
                value={formState.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-semibold bb-muted">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="bb-input mt-2 focus:border-amber-300"
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-semibold bb-muted">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className="bb-input mt-2 focus:border-amber-300"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-semibold bb-muted">Avatar</label>
              <input
                type="file"
                name="avatar"
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
              {status.loading ? "Creating..." : "Register"}
            </button>
            <p className="text-center text-sm bb-muted">
              Already have an account? Use the Login button to sign in.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
