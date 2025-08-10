const express=require('express')
const router=express.Router()
const {getAllAlbums,getAllAlbumById}=require('../controllers/album.controller')

router.get('/',getAllAlbums)
router.get('/:albumId',getAllAlbumById)


module.exports=router