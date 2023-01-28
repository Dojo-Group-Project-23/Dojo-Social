const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/dojo_social", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Dojo-Social DB has successfully launched!"))
    .catch(() => console.log("Launch failed..."))