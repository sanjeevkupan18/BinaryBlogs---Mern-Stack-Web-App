import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import { apiRequest } from "./lib/api";
import ExplorePosts from "./pages/ExplorePosts";
import PostDetail from "./pages/PostDetail";
import MyPosts from "./pages/MyPosts";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);
  const [redirectAfterAuth, setRedirectAfterAuth] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await apiRequest("/api/auth/me");
        setUser(data?.user || null);
      } catch (err) {
        setUser(null);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (view === "create-post" && !user) {
      setRedirectAfterAuth("create-post");
      setView("login");
    }
    if (view === "my-posts" && !user) {
      setRedirectAfterAuth("my-posts");
      setView("login");
    }
  }, [view, user]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleAuthSuccess = (loggedInUser) => {
    setUser(loggedInUser || { username: "User" });
    if (redirectAfterAuth) {
      setView(redirectAfterAuth);
      setRedirectAfterAuth(null);
    }
  };

  if (view === "login") {
    return (
      <Login
        onBack={() => setView("home")}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  if (view === "register") {
    return (
      <Register
        onBack={() => setView("home")}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  if (view === "create-post") {
    return <CreatePost onBack={() => setView("home")} onViewPosts={() => setView("explore")} />;
  }

  if (view === "explore") {
    return (
      <ExplorePosts
        onBack={() => setView("home")}
        onCreate={() => {
          if (user) {
            setView("create-post");
          } else {
            setRedirectAfterAuth("create-post");
            setView("login");
          }
        }}
        onSelectPost={(postId) => {
          setSelectedPostId(postId);
          setView("post-detail");
        }}
      />
    );
  }

  if (view === "post-detail") {
    return (
      <PostDetail
        postId={selectedPostId}
        user={user}
        onBack={() => setView("explore")}
        onLogin={() => setView("login")}
      />
    );
  }

  if (view === "my-posts") {
    return (
      <MyPosts
        onBack={() => setView("home")}
        onCreate={() => setView("create-post")}
        onSelectPost={(postId) => {
          setSelectedPostId(postId);
          setView("post-detail");
        }}
      />
    );
  }

  const handleLogout = async () => {
    try {
      await apiRequest("/api/auth/logout");
    } catch (err) {
      // ignore logout errors
    }
    setUser(null);
    setView("home");
  };

  return (
    <Home
      theme={theme}
      onToggleTheme={toggleTheme}
      onLogin={() => setView("login")}
      onRegister={() => setView("register")}
      user={user}
      onLogout={handleLogout}
      onExplorePosts={() => setView("explore")}
      onMyPosts={() => {
        if (user) {
          setView("my-posts");
        } else {
          setRedirectAfterAuth("my-posts");
          setView("login");
        }
      }}
      onStartWriting={() => {
        if (user) {
          setView("create-post");
        } else {
          setRedirectAfterAuth("create-post");
          setView("login");
        }
      }}
    />
  );
};

export default App;
