const {Server}=require("socket.io")
const  Message =require('./models/message.model')

module.exports.initializeSocket=(server)=>{
	
    const io=new Server(server,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    });
    const userSockets=new Map();
	const userActivities=new Map();
	io.on("connection",(socket)=>{

		socket.on("user_connected",(userId)=>{
			userSockets.set(userId,socket.id);
			userActivities.set(userId,"Idle");
			io.emit("user_connected",userId);
			socket.emit("users_online",Array.from(userSockets.keys()));
			io.emit("activities",Array.from(userActivities.entries()));
		});

		socket.on("update_activity",({userId,activity})=>{
			console.log("activity updated",userId,activity);
			userActivities.set(userId,activity);
			io.emit("activity_updated",{userId,activity});
		});

		socket.on("send_message",async(data)=>{
			const {senderId,receiverId,content}=data;

			if (!senderId || !receiverId) {
				console.error("Invalid IDs received:",{senderId,receiverId});
				socket.emit("message_error", "Invalid sender or receiver ID");
				return;
			}

			const receiverSocketId=userSockets.get(receiverId);
			try {
				const message=await Message.create({
					senderId,
					receiverId,
					content,
				});
		
				if (receiverSocketId) {
					io.to(receiverSocketId).emit("receive_message", message);
					console.log(`Message sent to receiver with ID: ${receiverId}`);
				} else {
					console.warn(`Receiver with ID ${receiverId} is not online.`);
				}
				socket.emit("message_sent", message);
			} catch (error) {
				console.error("Database error:", error);
				socket.emit("message_error", "Database error occurred");
			}
		});		

		socket.on("disconnect", () => {
			let disconnectedUserId;
			for (const [userId,socketId] of userSockets.entries()) {
				if (socketId === socket.id) {
					disconnectedUserId = userId;
					userSockets.delete(userId);
					userActivities.delete(userId);
					break;
				}
			}
			if (disconnectedUserId){
				io.emit("user_disconnected",disconnectedUserId);
			}
		});
	});
};