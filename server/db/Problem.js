const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
    id:Number,
    title:String,
    difficulty:String,
    acceptance:String,
    description:String
})

module.exports = mongoose.model("problems",problemSchema);