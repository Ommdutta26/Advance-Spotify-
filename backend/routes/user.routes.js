const express=require('express')
const router=express.Router()
const {protectRoute}=require('../middlewares/auth.middleware')
const {getAllUsers,getMessage}=require('../controllers/user.controller')
router.get('/',protectRoute,getAllUsers)
router.get('/messages/:userId',protectRoute,getMessage)

module.exports=router