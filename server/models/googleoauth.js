const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String, required : true},
    email: { type: String, required : true}
    
}, { timestamps: true })

const googleUserModel = mongoose.model("google-oauth", schema);
module.exports = googleUserModel;