const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {type:String, default: 'not set'},
    username: {type: String, required:true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: {type: Number, default: 14},
    role: {type: String,default: 'customer', enum: ['seller', 'customer']},
    token: { type: String }
});

module.exports = mongoose.model("user", userSchema);