const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema({
    title: String,
    detail: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

// Create Post Model
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
