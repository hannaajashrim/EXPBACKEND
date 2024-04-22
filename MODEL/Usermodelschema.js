const mongoose = require('mongoose')

const Userschema = mongoose.Schema({
    Name:{type:String},
    Email:{type:String},
    Password:{type:String}
})

const Usermodel = mongoose.model("user",Userschema);

module.exports=Usermodel;