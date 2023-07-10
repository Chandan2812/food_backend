const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,require:true},
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
      }
})

const UserModel = mongoose.model('User',userSchema)

module.exports={UserModel}