const MessageController = require('../controllers/message.controller')
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
    app.get('/api/chat/:room', authenticate, MessageController.getMessagesByRoom)
    app.post('/api/messages/new', authenticate, MessageController.createMessage)
}