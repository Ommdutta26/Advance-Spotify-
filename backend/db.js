const mongoose=require('mongoose')

module.exports.connectToDb=async()=>{
   try {
    await mongoose.connect('mongodb://localhost:27017/spotify').then(()=>{
        console.log("Connected to Database successfully")
    }).catch(()=>{
        console.log("Cannot connected to database",error.message)
    })
   } catch (error) {
        console.log("Cannot connect to database")
   }
}

