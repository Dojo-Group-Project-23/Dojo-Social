const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: [true, "Please ensure to enter some content before posting"],
        minlength: [2, 'We require atleast 2 charactes per post']
    }
}, {timestamps:true})

module.exports = mongoose.model('Post', PostSchema)