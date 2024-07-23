const mongoose = require('mongoose')

const schema = new mongoose.Schema({ 
    category: {type : String, required : true},
    problem: {type : String, required : true},
    identification: {type : Array, required : true},
    step1: {type : String, required : true},
    step2: {type : String, required : false},
    step3: {type : String, required : false}

}, { timestamps: true});

const Fault = mongoose.model('faults', schema);
module.exports = Fault;