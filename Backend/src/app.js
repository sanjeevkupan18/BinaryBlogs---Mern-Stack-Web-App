const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Import routes
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/post.routes');
const uploadRouter = require('./routes/upload.routes');
const userRouter = require('./routes/user.routes');

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/users', userRouter);


module.exports = app;
