const mongoose = require("mongoose")

const  menuSchema= mongoose.Schema({
    name:{type:String,required:true},
    description:String,
    price:{type:Number,required:true},
    image:String
})

const restaurantSchema= mongoose.Schema({
    name:{type:String, required:true},
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
      },
      menu:[menuSchema]
})

const RestaurantModel= mongoose.model('Restaurant',restaurantSchema)

module.exports={RestaurantModel}