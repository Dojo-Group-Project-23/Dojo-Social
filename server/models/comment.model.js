const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    },
    content: {
        type: String,
        required: [true, 'Please make sure to enter some content befor submiting.'],
        minlength: [2, 'We require atleast 2 charactes per comment']
    }
}, {timestamps:true})

module.exports = mongoose.model('Comment', CommentSchema)