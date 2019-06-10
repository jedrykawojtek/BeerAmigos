const mongoose = require("mongoose")
const Schema = mongoose.Schema

const beerSchema = mongoose.model("beer", new Schema({
    creator: {ref:"users", type:mongoose.Types.ObjectId},
    name: String,
    type: String,
    tagline: String,
    description: String,
    pic: String
}))

module.exports = beerSchema

// const userSchema = new Schema({
//     username: {type: String, required: true},
//     password: {type: String, required: true},
//     profilePicture: {type: String, required: true}
// })


// module.exports = mongoose.model("User", userSchema)



