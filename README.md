# BinaryBlogs — MERN Stack Blog App

BinaryBlogs is a MERN stack blog platform with authentication, posts, ImageKit uploads, comments, and a modern responsive UI.

## Features
- User authentication (register/login/logout)
- Avatar upload with ImageKit
- Create, update, delete posts (owner only)
- Image uploads for posts via ImageKit
- Public explore feed and post detail view
- Comments (readable by all, writeable by logged‑in users only)
- Responsive UI with light/dark mode

## Tech Stack
- Frontend: React + Vite + Tailwind
- Backend: Node.js + Express + MongoDB + Mongoose
- Media: ImageKit

## Project Structure
- `Backend/` — Express API
- `Frontend/` — React client

## Environment Variables

### Backend (`Backend/.env`)
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

### Frontend (`Frontend/.env`)
```
VITE_API_BASE_URL=http://localhost:5000
```

## Installation

### 1) Backend
```
cd Backend
npm install
npm run dev
```

### 2) Frontend
```
cd Frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` by default.
Backend runs on `http://localhost:5000` by default.

## Core API Routes

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/logout`
- `GET /api/auth/me`

### Posts
- `POST /api/posts/create-post` (auth)
- `GET /api/posts`
- `GET /api/posts/:id`
- `PUT /api/posts/:id` (auth + owner)
- `DELETE /api/posts/:id` (auth + owner)
- `GET /api/posts/me` (auth)

### Comments
- `GET /api/posts/:id/comments`
- `POST /api/posts/:id/comments` (auth)

### Upload
- `POST /api/upload` (auth)
- `POST /api/users/avatar` (auth)

## Notes
- Cookies are used for auth (`token`).
- CORS is enabled with credentials.
- Image uploads use `multipart/form-data`.

## License
MIT
