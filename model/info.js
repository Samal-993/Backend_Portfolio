const mongoose = require("mongoose")
const Schema = mongoose.Schema


const InfoSchma = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
    
    },
    message:{
        type:String,
        
    }
});

const Info = mongoose.model ("Info" , InfoSchma)

module.exports = Info
