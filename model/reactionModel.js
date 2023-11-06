const mongoose = require('mongoose');
const Auth = require('./authModel');
const Post = require('./post');

const reaction = new mongoose.Schema({
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
    reaction: { 
        type: Boolean, 
        required: false 
    },
}, { timestamps: true })

const Reaction = mongoose.model('reaction', reaction)

module.exports = Reaction;