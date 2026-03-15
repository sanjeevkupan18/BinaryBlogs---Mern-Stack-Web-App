const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: ""
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    }
}, { timestamps: true });

const Post = mongoose.model('posts', postSchema);

module.exports = Post;
