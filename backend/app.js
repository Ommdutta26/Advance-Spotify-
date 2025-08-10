const dotenv=require('dotenv');
dotenv.config();
const http=require('http');
const express=require('express');
const { Server }=require('socket.io');
const { clerkMiddleware }=require('@clerk/express');

const {initializeSocket}=require('./socket')

const fileUpload = require('express-fileupload');

const app=express();
const cors=require('cors');
const { connectToDb }=require('./db');
const path=require('path');

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use(express.json());
app.use(clerkMiddleware());

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:path.join(process.cwd(),'temp'),
    createParentPath:true,
    limits:{fileSize:20*1024*1024}
}));

const userRoutes=require('./routes/user.routes');
const authRoutes=require('./routes/auth.routes');
const songRoutes=require('./routes/song.routes');
const albumRoutes=require('./routes/album.routes');
const adminRoutes=require('./routes/admin.routes');
const statRoutes=require('./routes/stat.routes');
const singRoutes=require('./routes/createmusic.routes')

app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/songs',songRoutes);
app.use('/api/albums',albumRoutes);
app.use('/api/stats',statRoutes);
app.use('/api',singRoutes)

const server = http.createServer(app);

initializeSocket(server)

const PORT=process.env.PORT||3000;
server.listen(PORT,()=>{
    connectToDb();
    console.log(`Server is listening on port ${PORT}`);
});
