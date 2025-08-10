
const User=require('../models/user.Model')
const Message=require("../models/message.model")



module.exports.getAllUsers=async(req,res)=>{
    try {
        const currentId=req.auth.userId
        const users=await User.find({clerkId:{$ne:currentId}})
        res.status(200).json(users)
    } catch (error) {
        console.log("Could not fetch users")
    }
}


module.exports.getMessage=async(req,res)=>{
    try {
		const myId=req.auth.userId;
		const {userId}=req.params;
		const messages = await Message.find({
			$or: [
				{senderId:userId,receiverId:myId},
				{senderId:myId,receiverId:userId},
			],
		}).sort({createdAt:-1});
		res.status(200).json(messages);
	} catch (error) {
		console.log("Could not get messages")
	}
}

