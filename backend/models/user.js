const mongoose = require("mongoose")
// var bcrypt = require('bcryptjs');
const Schema = mongoose.Schema

const userSchema = mongoose.model("user", new Schema({
    username: String,
    password: String,
    profilePic: String
}))

module.exports = userSchema

// const userSchema = new Schema({
//     username: {type: String, required: true},
//     password: {type: String, required: true},
//     profilePicture: {type: String, required: true}
// })


// module.exports = mongoose.model("User", userSchema)