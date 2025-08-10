const express=require('express')
const {authCallback}=require('../controllers/auth.controller')

const router=express.Router()

router.post('/callback',authCallback)

module.exports=router