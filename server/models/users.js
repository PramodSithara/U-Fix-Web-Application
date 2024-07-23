const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userName: { type: String, required : true},
    email: { type: String, required : true},
    role: { type: String, default: 'user'},
    password: { type: String, required : true}
    
}, { timestamps: true })

const UserModel = mongoose.model("users", schema);
module.exports = UserModel;