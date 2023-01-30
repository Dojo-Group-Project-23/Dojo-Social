const express = require("express")
const cors = require("cors")
const app = express()
const cookieParser = require("cookie-parser")
const socket = require("socket.io")

require("dotenv").config()

app.use(express.json(), express.urlencoded({extended:true}))

app.use(cookieParser())

app.use(cors({
    credentials:true,
    origin: ["http://localhost:3000"],
}))

require("./config/mongoose.config")
require("./routes/user.routes")(app)
require("./routes/post.routes")(app)

const server = app.listen(8000,() => console.log('Dojo-Social Running: http://localhost:8000'))

const io = socket(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["*"],
        credentials: true
    }
})

io.on("connection", socket => {
    console.log(`New socket: ${socket}`);
})