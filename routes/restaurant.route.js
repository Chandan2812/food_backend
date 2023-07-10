const express =require("express")
const restaurantRouter=express.Router()

const {authenticate} = require("../middleware/auth")

const {RestaurantModel} = require("../model/restaurant.model")


restaurantRouter.get("/restaurants",async (req,res)=>{

    try {
        const restaurants= await RestaurantModel.find()
        res.status(200).json(restaurants)
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
})


// restaurantRouter.post("/restaurants",async(req,res)=>{
//     try {
//         const {name,address}=req.body

//         const restaurant = new RestaurantModel ({name,address})
//         await restaurant.save()

//         res.status(201).json({message:"restaurant added successfully"})
//     } catch (error) {
//         res.status(500).json({message:error.message}) 
//     }
// })


restaurantRouter.get("/restaurants/:id",async (req,res)=>{
    try {
        const {id}=req.params
        const restaurants= await RestaurantModel.find(id)
        if(!restaurants)
        {
            return res.status(404).json({message:"Restaurant not found"})
        }
        res.status(200).json(restaurants)
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
   
})


restaurantRouter.get("/restaurants/:id/menu",async (req,res)=>{
    try {
        const {id}=req.params
        const restaurants= await RestaurantModel.find(id)
        if(!restaurants)
        {
            return res.status(404).json({message:"Restaurant not found"})
        }
        res.status(200).json(restaurants.menu)
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
})


restaurantRouter.post("/restaurants/:id/menu",authenticate,async (req,res)=>{
    try {
        const {id}=req.params

        const {name,description,price,image}=req.body
        const restaurants= await RestaurantModel.find(id)
        if(!restaurants)
        {
            return res.status(404).json({message:"Restaurant not found"})
        }

        const newItem= {name,description,price,image}

        restaurants.menu.push(newItem)

    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
})


restaurantRouter.delete("/restaurants/:id/menu/:itemid",authenticate,async (req,res)=>{
    try {
        const {id,itemid}=req.params
        const restaurants= await RestaurantModel.find(id)
        if(!restaurants)
        {
            return res.status(404).json({message:"Restaurant not found"})
        }

        const item=restaurants.menu.findOne(itemid)

        restaurants.menu.splice(item,1)
        await restaurants.save()

        res.status(202).json({message:"item deleted"})

    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
})
module.exports={restaurantRouter}

