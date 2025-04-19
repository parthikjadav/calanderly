const { default: mongoose } = require("mongoose")

const connectDB = ()=>{
    mongoose.connect(process.env.DB_URI).then(()=> console.log("connected to db")).catch((e)=> console.log(e.message))
}

module.exports = connectDB