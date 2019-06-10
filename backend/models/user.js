const mongoose = require("mongoose")
// var bcrypt = require('bcryptjs');
const Schema = mongoose.Schema

const userSchema = mongoose.model("user", new Schema({
    username: String,
    password: String,
    profilePic: String,
    beersCreated: [{type: mongoose.Schema.Types.ObjectId, ref: "beer"}],
    gotDrunkBy: [{type: mongoose.Schema.Types.ObjectId, ref: "beer"}],
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: "beer"}]
}))

module.exports = userSchema

// const userSchema = new Schema({
//     username: {type: String, required: true},
//     password: {type: String, required: true},
//     profilePicture: {type: String, required: true}
// })


// module.exports = mongoose.model("User", userSchema)