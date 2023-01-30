const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    room: {
        type: String
    },
    content: {
        type: String,
        required: [true, 'Sorry, we dont allow empty messages']
    }
}, {timestamps: true})

module.exports = mongoose.model('Message', MessageSchema)