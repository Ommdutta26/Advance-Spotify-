const express=require('express')
const router=express.Router()
const {protectRoute, requireAdmin}=require('../middlewares/auth.middleware')
const {getStats}=require('../controllers/stat.controller')
router.get('/get-stats',protectRoute,requireAdmin,getStats)

module.exports=router