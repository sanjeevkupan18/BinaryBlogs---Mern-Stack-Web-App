import React from "react";
import Navbar from "../components/Navbar";

const Home = ({
  theme,
  onToggleTheme,
  onLogin,
  onRegister,
  onStartWriting,
  onExplorePosts,
  onMyPosts,
  user,
  onLogout,
}) => {
  return (
    <div className="bb-bg min-h-screen bb-text">
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        onLogin={onLogin}
        onRegister={onRegister}
        user={user}
        onLogout={onLogout}
        onMyPosts={onMyPosts}
      />

      <main className="relative">
        <section className="bb-hero-grid relative flex min-h-screen items-center justify-center px-4 pt-24 sm:px-6 sm:pt-28">
          <div className="bb-float absolute left-10 top-24 h-32 w-32 rounded-full bg-cyan-400/30 blur-3xl" />
          <div className="bb-float absolute right-12 top-40 h-40 w-40 rounded-full bg-amber-300/25 blur-3xl" />
          <div className="bb-sweep absolute bottom-10 left-0 h-24 w-56 rounded-full bg-white/5 blur-2xl" />

          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 sm:gap-8">
            <div className="bb-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-widest bb-muted">
              Welcome to BinaryBlogs
            </div>
            <h1 className="bb-fade-up-delayed font-display text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Write sharp.
              <br />
              <span className="bb-text-accent">Read deeper.</span> Build your digital legacy.
            </h1>
            <p className="bb-fade-up-more max-w-2xl text-sm bb-muted sm:text-lg">
              A modern blog space for builders, learners, and storytellers. Share
              your ideas, track your growth, and connect with a community that
              loves clean code and clear thinking.
            </p>
            <div className="bb-fade-up-more flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                className="rounded-full bg-gradient-to-r from-amber-300 to-cyan-200 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:from-amber-200 hover:to-cyan-100 sm:px-6 sm:py-3"
                type="button"
                onClick={onStartWriting}
              >
                Start Writing
              </button>
              <button
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold bb-text transition hover:border-white/30 hover:bg-white/15 sm:px-6 sm:py-3"
                type="button"
                onClick={onExplorePosts}
              >
                Explore Posts
              </button>
            </div>
          </div>
        </section>

        <section className="relative px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-10 flex flex-col gap-3">
              <h2 className="font-display text-3xl font-semibold">Why BinaryBlogs</h2>
              <p className="max-w-2xl bb-muted">
                Built for focus and flow. Clean publishing, sharp visuals, and a
                calm space for long-form thoughts.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bb-card rounded-2xl border p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10">
                <h3 className="font-display text-xl font-semibold">Fast Publishing</h3>
                <p className="mt-3 text-sm bb-muted">
                  Draft, preview, and publish without friction. Your ideas go
                  live in minutes.
                </p>
              </div>
              <div className="bb-card rounded-2xl border p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10">
                <h3 className="font-display text-xl font-semibold">Image Ready</h3>
                <p className="mt-3 text-sm bb-muted">
                  Upload covers and avatars with ImageKit for crisp delivery and
                  blazing speed.
                </p>
              </div>
              <div className="bb-card rounded-2xl border p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10">
                <h3 className="font-display text-xl font-semibold">Engaged Community</h3>
                <p className="mt-3 text-sm bb-muted">
                  Comment, react, and connect with readers who value thoughtful
                  writing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold">Ready to publish?</h2>
                <p className="mt-3 max-w-xl bb-muted">
                  Join BinaryBlogs and start shaping your personal knowledge base
                  today.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="rounded-full bg-gradient-to-r from-amber-300 to-cyan-200 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:from-amber-200 hover:to-cyan-100"
                  type="button"
                  onClick={onRegister}
                >
                  Create Account
                </button>
                <button className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold bb-text transition hover:border-white/30 hover:bg-white/15">
                  View Examples
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="px-4 pb-8 sm:px-6 sm:pb-10">
          <div className="mx-auto w-full max-w-6xl border-t border-white/10 pt-6 text-center text-sm bb-muted">
            © 2026 SanjuCoding
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
