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




