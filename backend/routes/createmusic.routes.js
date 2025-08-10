const express=require('express')
const { generateMusic, singMusic } = require('../controllers/generatemusic.controller')

const router=express.Router()

router.post('/generate-lyrics',generateMusic)
router.post('/sing',singMusic)


module.exports=router