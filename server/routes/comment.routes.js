const CommentController = require('../controllers/comment.controller')
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
    app.put('/api/comments/:id', authenticate, CommentController.updateComment)
    app.delete('/api/comments/:id', authenticate, CommentController.deleteComment)
    app.get('/api/comments/post/:id', authenticate, CommentController.fetchCommentsByPostId)
    app.get('/api/comments/:id', authenticate, CommentController.fetchCommentById)
    app.get('/api/comments', authenticate, CommentController.fetchAllComments)
    app.post('/api/comments', authenticate, CommentController.createComment)
}