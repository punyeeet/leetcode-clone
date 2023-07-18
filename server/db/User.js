const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    admin:Boolean,
    password:String
})

module.exports = mongoose.model("users",userSchema);