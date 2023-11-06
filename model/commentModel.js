const mongoose = require('mongoose');
const Auth = require('./authModel');
const Post = require('./post');

const comment = new mongoose.Schema({
    post: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: Post, 
         required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: Auth, 
        required: true 
    },
    commentText: { 
        type: String, 
        required: false 
    },
}, { timestamps: true })

const Comment = mongoose.model('Comment', comment)

module.exports = Comment;