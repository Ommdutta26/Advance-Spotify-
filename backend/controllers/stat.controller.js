const Song = require('../models/song.Model');
const User = require('../models/user.Model');
const Albums = require('../models/album.Model');

module.exports.getStats=async(req, res)=>{
    try {
        const [totalSongs, totalUsers, totalAlbums, uniqueArtist]=await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Albums.countDocuments(),
            Song.aggregate([
                {
                    $unionWith:{
                        coll:"albums",
                        pipeline:[]
                    }
                },
                {
                    $group:{
                        _id:"$artist" 
                    }
                },
                {
                    $count:"count"
                }
            ])
        ]);

        res.status(200).json({
            totalSongs,
            totalUsers,
            totalAlbums,
            totalArtists: uniqueArtist[0]?.count || 0
        });

    } catch (error) {
        console.error("Error in fetching the stats",error);
        res.status(500).json({ message: "Internal server error"});
    }
};
