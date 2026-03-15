import React, { useState } from "react";

const Navbar = ({
  theme,
  onToggleTheme,
  onLogin,
  onRegister,
  user,
  onLogout,
  onMyPosts,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const defaultAvatar =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23ffb454'/%3E%3Cstop offset='1' stop-color='%236ee7ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='120' height='120' rx='24' fill='%2310182d'/%3E%3Ccircle cx='60' cy='46' r='20' fill='url(%23g)'/%3E%3Cpath d='M20 104c8-22 28-32 40-32s32 10 40 32' fill='url(%23g)'/%3E%3C/svg%3E";

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-4 sm:top-4 sm:px-6">
      <nav className="bb-nav mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur sm:px-5">
        <div className="flex items-center gap-3">
          <div className="bb-glow grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-lg font-semibold text-white">
            B
          </div>
          <div className="font-display text-lg font-semibold tracking-wide bb-text">BinaryBlogs</div>
        </div>
        <div className="hidden items-center gap-2 sm:flex sm:gap-3">
          <button
            className="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-[11px] font-semibold bb-text transition hover:border-white/40 hover:bg-white/15 sm:text-xs"
            onClick={onToggleTheme}
            type="button"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          {user ? (
            <div className="relative">
              <button
                className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-3 py-1.5"
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <img
                  src={user.avatar || defaultAvatar}
                  alt={user.username || "User"}
                  className="h-8 w-8 rounded-full border border-white/20 object-cover"
                />
                <span className="text-sm font-semibold bb-text">
                  {user.username || "User"}
                </span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-4 w-40 rounded-2xl border border-white/15 bg-white/10 p-2 shadow-xl backdrop-blur">
                  <button
                    className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold bb-text transition hover:bg-white/10"
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onMyPosts();
                    }}
                  >
                    My Posts
                  </button>
                  <button
                    className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold bb-text transition hover:bg-white/10"
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold bb-text transition hover:border-white/30 hover:bg-white/15"
                onClick={onLogin}
                type="button"
              >
                Login
              </button>
              <button
                className="rounded-full bg-gradient-to-r from-amber-300 to-cyan-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:from-amber-200 hover:to-cyan-100"
                onClick={onRegister}
                type="button"
              >
                Register
              </button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 sm:hidden">
          <button
            className="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold bb-text transition hover:border-white/40 hover:bg-white/15"
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            Menu
          </button>
          {mobileOpen && (
            <div className="absolute right-4 top-16 z-50 w-56 rounded-2xl border border-white/15 bg-white/10 p-3 shadow-xl backdrop-blur">
              <button
                className="mb-2 w-full rounded-xl px-3 py-2 text-left text-sm font-semibold bb-text transition hover:bg-white/10"
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onToggleTheme();
                }}
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
              {user ? (
                <>
                  <div className="mb-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <img
                      src={user.avatar || defaultAvatar}
                      alt={user.username || "User"}
                      className="h-8 w-8 rounded-full border border-white/20 object-cover"
                    />
                    <span className="text-sm font-semibold bb-text">
                      {user.username || "User"}
                    </span>
                  </div>
                  <button
                    className="mb-2 w-full rounded-xl px-3 py-2 text-left text-sm font-semibold bb-text transition hover:bg-white/10"
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      onMyPosts();
                    }}
                  >
                    My Posts
                  </button>
                  <button
                    className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold bb-text transition hover:bg-white/10"
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      onLogout();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="mb-2 w-full rounded-xl px-3 py-2 text-left text-sm font-semibold bb-text transition hover:bg-white/10"
                    onClick={() => {
                      setMobileOpen(false);
                      onLogin();
                    }}
                    type="button"
                  >
                    Login
                  </button>
                  <button
                    className="w-full rounded-xl bg-gradient-to-r from-amber-300 to-cyan-200 px-3 py-2 text-left text-sm font-semibold text-slate-900 transition hover:from-amber-200 hover:to-cyan-100"
                    onClick={() => {
                      setMobileOpen(false);
                      onRegister();
                    }}
                    type="button"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
