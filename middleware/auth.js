const jwt=require("jsonwebtoken")
require("dotenv").config()

const authenticate=(req,res,next)=>{

    try {
        const token=req.headers.authorization
        if(!token)
        {
            return res.status(401).json({message:"Unauthorized"})
        }

        const decoded = jwt.verify(token,process.env.SECRET)
        req.user=decoded
        next() 
    } catch (error) {
        return res.status(401).json({message:error.message})
    }
   


}

module.exports={authenticate}
