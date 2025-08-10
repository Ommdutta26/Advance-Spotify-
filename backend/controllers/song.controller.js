const  Song=require('../models/song.Model')

module.exports.getAllSongs=async(req,res,next)=>{
    try {
        const songs=await Song.find().sort({createdAt:-1});
        res.status(200).json(songs);
    } catch (error) {
        console.error("Error fetching all songs:", error.message);
        res.status(500).json({ message: "Failed to fetch songs. Please try again." });
    }
};

module.exports.featuredSongs=async(req, res)=>{
    try {
        const songs=await Song.aggregate([
            {$sample:{size:6}},
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ]);
        res.status(200).json(songs);
    } catch (error) {
        console.error("Error fetching featured songs:", error.message);
        res.status(500).json({ message: "Failed to fetch featured songs. Please try again." });
    }
};

module.exports.getMadeForYouSongs=async(req,res)=>{
    try {
        const songs=await Song.aggregate([
            {$sample:{size:4}},
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ]);
        res.status(200).json(songs);
    } catch (error) {
        console.error("Error fetching made-for-you songs:",error.message);
        res.status(500).json({message: "Failed to fetch made-for-you songs. Please try again."});
    }
};

module.exports.getTrendingSongs=async(req,res)=>{
    try {
        const songs=await Song.aggregate([
            {$sample:{size:4}},
            {
                $project: {
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ]);
        res.status(200).json(songs);
    } catch (error) {
        console.error("Error fetching trending songs:",error.message);
        res.status(500).json({ message: "Failed to fetch trending songs. Please try again."});
    }
};
