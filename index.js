const express=require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/user.route")
const {restaurantRouter}=require("./routes/restaurant.route")
const {orderRouter}=require("./routes/order.route")

require("dotenv").config()

const app=express()

app.use(express.json())
app.use("/api",userRouter)
app.use("/api",restaurantRouter)
app.use("/api",orderRouter)


app.listen(process.env.PORT,async (req,res)=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is running")
})