const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Posts', PostsSchema);