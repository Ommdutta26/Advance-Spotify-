const userModel=require('../models/user.Model')

module.exports.authCallback=async(req,res)=>{
    try {
        const{id,firstName,lastName,imageUrl}=req.body
        const user=await userModel.findOne({clerkId:id})
        if(user){
            res.status(400).json({message:"User already exist"})
        }
        if(!user){
            await userModel.create({
                clerkId:id,
                fullName:`${firstName} ${lastName}`,
                imageUrl
            })
        }
        res.status(200).json({message:"OK"})
    } catch (error) {
        console.log("Error occurred",error.message)
    }
}