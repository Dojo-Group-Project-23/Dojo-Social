const PostController = require('../controllers/post.controller')
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
    app.put('/api/posts/:id', authenticate, PostController.UpdatePost)
    app.delete('/api/posts/:id', authenticate, PostController.deletePost)
    app.get('/api/posts/user/:id', authenticate, PostController.fetchAllPostByUserId)
    app.get('/api/posts/:id', authenticate, PostController.fetchPostById)
    app.get('/api/posts', authenticate, PostController.fetchAllPost)
    app.post('/api/posts', authenticate, PostController.createPost)
}