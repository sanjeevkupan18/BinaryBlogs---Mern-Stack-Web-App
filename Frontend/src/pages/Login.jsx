import React, { useState } from "react";
import { apiRequest } from "../lib/api";

const Login = ({ onBack, onSuccess }) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    try {
      const formData = new FormData();
      formData.append("email", formState.email);
      formData.append("password", formState.password);

      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: formData,
      });

      setStatus({ loading: false, error: "", success: "Logged in successfully." });
      if (onSuccess) {
        onSuccess(data?.user || null);
      }
      setTimeout(() => onBack(), 600);
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: "" });
    }
  };

  return (
    <div className="bb-bg min-h-screen bb-text px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">Welcome back</h1>
            <p className="mt-2 bb-muted">Sign in to continue to BinaryBlogs.</p>
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
          <form className="space-y-5" onSubmit={handleSubmit}>
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
                placeholder="••••••••"
                className="bb-input mt-2 focus:border-amber-300"
                value={formState.password}
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
              {status.loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-center text-sm bb-muted">
              New here? Ask the Register button on the home page to get started.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
