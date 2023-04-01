// import mongoose
const mongoose = require('mongoose')

// mongoose connect to url
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to mongoDB")
})

mongoose.connection.on("error", (error) => {
    console.log("mongoDB Connection Error:", error)
})

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
})

// export mongoose 
module.exports = { mongoose }