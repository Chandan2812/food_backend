const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {UserModel}=require("../model/user.model")
const {authenticate}=require("../middleware/auth")
require('dotenv').config()

const userRouter=express.Router();


userRouter.post("/register",async (req,res)=>{
    try {
       const {name,email,password,address}=req.body

       const userExist = await UserModel.findOne({email})

       if(userExist)
       {
        return res.status(400).json({message:'User already present'})
       }

       const hashedPassword = await bcrypt.hash(password,10)

       const user=new UserModel({name,email,password:hashedPassword,address})

       await user.save()

       res.status(201).json({message:"User registered Successfully"})
    } catch (error) {
        res.status(500).json({message:error})
    }
})




userRouter.post("/login",async (req,res)=>{
    try {
        const {email,password}=req.body

        const user = await UserModel.findOne({email})
        // console.log(user)
        if(!user)
        {
         return res.status(400).json({message:'User is not present, Please Register'})
        }

        const passwordMatch = await bcrypt.compare(password,user.password)

        if(!passwordMatch)
        {
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const token = jwt.sign({userId:user._id},process.env.SECRET,{expiresIn:'1h'})

        res.status(201).json({message:"login successfully",token:token})
    } catch (error) {
        res.status(500).json({message:error})
    }
})


userRouter.patch("/user/:id/reset",authenticate,async(req,res)=>{
    try {
        const {id}=req.params
        const {currentPassword,newPassword}=req.body

        const user= await UserModel.findById({id})
        if(!user)
        {
            return res.status(404).json({message:"user not found"})
        }

        const passwordMatch=await bcrypt.compare(currentPassword,user.password)
        if(!passwordMatch)
        {
            return res.status(404).json({message:"Invalid current password"})

        }

        const hashedPassword=await bcrypt.hash(newPassword,10)

        user.password=hashedPassword
        await user.save();

        res.status(204).json({message:"password updated"})
    } catch (error) {
        res.status(500).json({message:error})
    }
})


module.exports={userRouter}
