const UserController = require('../controllers/user.controller')
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
    app.put("/api/users/:id", authenticate, UserController.updateUser)
    app.delete("/api/users/:id", authenticate, UserController.deleteUser)
    app.get("/api/users/:id", authenticate, UserController.fecthUserById)
    app.get("/api/users", authenticate, UserController.fecthAllUsers)
    app.get("/api/logout", UserController.logout)
    app.post("/api/register", UserController.register)
    app.post("/api/login", UserController.login)
}