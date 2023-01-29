const jwt = require('jsonwebtoken')
const key = process.env.AUTH_KEY

module.exports.secret = key

module.exports.authenticate = (req,res,next) => {
    jwt.verify(req.cookies.userToken, key, (err,payload) => {
        if (err) {
            res.status(401).json({verfied: false})
        } else {
            next()
        }
    })
}