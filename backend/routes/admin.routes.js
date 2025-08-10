const express=require('express')
const { requireAdmin,protectRoute } = require('../middlewares/auth.middleware')
const {createSong,deleteSong,createAlbum,deleteAlbum,checkAdmin}=require('../controllers/admin.controller')

const router=express.Router()
router.get('/check',protectRoute,requireAdmin,checkAdmin)
router.post('/songs',protectRoute,requireAdmin,createSong)
router.delete('/songs/:id',protectRoute,requireAdmin,deleteSong)
router.post('/albums',protectRoute,requireAdmin,createAlbum)
router.delete('/albums/:id',protectRoute,requireAdmin,deleteAlbum)

module.exports=router