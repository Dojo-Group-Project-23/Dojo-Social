const UserController = require('../controllers/user.controller')
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
    app.put("/api/users/:id", authenticate, UserController.updateUser)
    app.delete("/api/users/:id", authenticate, UserController.deleteUser)
    app.get("/api/users/:id", UserController.fecthUserById) //edited by chris *removed authenticate
    app.get("/api/users", UserController.fecthAllUsers) //edited by chris *removed authenticate
    app.get("/api/logout", UserController.logout)
    app.post("/api/register", UserController.register)
    app.post("/api/login", UserController.login)
}