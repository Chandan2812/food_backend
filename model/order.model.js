const mongoose= require("mongoose")

const orderSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    restaurant:{type:mongoose.Schema.Types.ObjectId, ref:'Restaurant', required:true},
    items: [{
        name: String,
        price: Number,
        quantity: Number
      }],
      totalPrice: Number,
      deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
      },
      status: String
})


module.exports = mongoose.model("Order",orderSchema)
