const Album = require("../models/album.Model")


module.exports.getAllAlbums=async(req,res)=>{
   try {
        const albums=await Album.find()
        res.status(200).json(albums)
   } catch (error) {
        console.log("Error in fetching albums")
   }
}


module.exports.getAllAlbumById=async(req,res)=>{
    try {
        const {albumId}=req.params
        const album=await Album.findById(albumId).populate('songs')
        if(!album){
            return res.status(400).json({message:"Album not found"})
        }
        res.status(200).json(album)
    } catch (error) {
        console.log("Error in fetching the album")
    }
}