const Message = require('../models/message.model')

module.exports = {
    createMessage: (req,res) => {
        Message.create(req.body)
            .then(newMessage => res.json(newMessage))
            .catch(err => res.status(400).json(err))
    },
    getMessagesByRoom: (req,res) => {
        Message.find({room: req.params.room}).populate('user')
            .then(roomMessages => res.json(roomMessages))
            .catch(err => res.json(err))
    }
}