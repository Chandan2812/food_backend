const express=require("express")
const orderRouter=express.Router()
const {OrderModel}=require("../model/order.model")
const {authenticate}=require("../middleware/auth")


orderRouter.post("/orders",authenticate,async (req,res)=>{
    try {
        const {user,restaurant,items,totalPrice,deliveryAddress}=req.body

        const order = new OrderModel ({user,restaurant,items,totalPrice,deliveryAddress})
        await order.save()

        res.status(201).json(order)
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
})


orderRouter.get("/orders/:id",authenticate,async (req,res)=>{
    try {
        const {id}=req.params

        const order=await OrderModel.findById(id)
        if(!order)
        {
            return res.status(404).json({message:"order not found"})
        }
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
    
})


orderRouter.patch("/orders/:id",authenticate,async (req,res)=>{
    try {
       const {id}=req.params
       const {status}=req.body

       const order=await OrderModel.findById(id)
        if(!order)
        {
            return res.status(404).json({message:"order not found"})
        }

        order.status=status
        await order.save()

        res.status(204).json({message:"status updated successfully"})

    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
})




module.exports={orderRouter}