const mongoose = require('mongoose')
const DATABASE = process.env.DATABASE;

const connectDB = ()=>{
    mongoose.connect(DATABASE).then(()=>console.log("connected to backend"));
}
  
connectDB();