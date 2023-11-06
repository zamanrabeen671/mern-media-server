const mongoose = require("mongoose");
const Auth = require("./authModel");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    addedby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
    }

}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)
module.exports = Post;