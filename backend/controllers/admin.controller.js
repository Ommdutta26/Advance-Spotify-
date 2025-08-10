const Song=require('../models/song.Model');
const Album=require('../models/album.Model');
const {cloudinary}=require('../cloudinary');

const cloudinaryUpload=async(file) => {
    try {
        const result=await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type:'auto'
        });
        return result.secure_url;
    } catch (error) {
        console.error("Error in uploading file to Cloudinary:", error.message); 
        throw new Error("Error in uploading to Cloudinary");
    }
};

module.exports.createSong=async(req,res)=>{
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Upload all necessary files" });
        }
        const {title,artist,albumId,duration}=req.body;
        const audioFile=req.files.audioFile;
        const imageFile=req.files.imageFile;
        const audioUrl=await cloudinaryUpload(audioFile);
        const imageUrl=await cloudinaryUpload(imageFile);
        const song=new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        });
        await song.save();

        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push:{songs:song._id}
            });
        }
        res.status(201).json(song);

    } catch (error) {
        console.error("An error occurred:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.deleteSong=async(req, res)=>{
    try {
        const {id}=req.params;
        const song=await Song.findById(id);

        if (!song){
            return res.status(400).json({message:"Song does not exist"});
        }

        if (song.albumId){
            await Album.findByIdAndUpdate(song.albumId,{
                $pull:{songs:song._id}
            });
        }

        await Song.findByIdAndDelete(id)
        res.status(200).json({ message:"Song deleted successfully"});
    } catch (error) {
        console.error("Could not delete the song:", error.message); 
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.createAlbum=async(req,res)=>{
    try {
        const {title,artist,releaseYear}=req.body;
        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({message:"Image file is required"});
        }
        const {imageFile}=req.files;
        const imageUrl=await cloudinaryUpload(imageFile);
        const album=new Album({
            title,
            artist,
            releaseYear,
            imageUrl
        });
        await album.save();
        res.status(201).json(album);
    } catch (error) {
        console.error("Error: Could not create album:", error.message);
        res.status(500).json({ message: "Internal server error" }); 
    }
};

module.exports.deleteAlbum=async(req,res)=>{
    try {
        const {id}=req.params;
        await Song.deleteMany({albumId:id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({message:"Album deleted successfully"});
    } catch (error) {
        console.error("Error:",error.message); 
        res.status(500).json({message:"Internal server error"});
    }
};


module.exports.checkAdmin=async(req,res)=>{
    res.status(200).json({admin:true});
};
