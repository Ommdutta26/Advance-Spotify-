const express=require('express')
const { getAllSongs,featuredSongs,getMadeForYouSongs,getTrendingSongs } = require('../controllers/song.controller')
const {protectRoute,requireAdmin}=require('../middlewares/auth.middleware')
const router=express.Router()

router.get('/',protectRoute,requireAdmin,getAllSongs)
router.get('/featured',featuredSongs)
router.get('/made-for-you',getMadeForYouSongs)
router.get('/trending',getTrendingSongs)


module.exports=router