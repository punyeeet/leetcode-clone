const mongoose = require('mongoose')

const connectDB = ()=>{
    mongoose.connect("mongodb+srv://puneetpradhan07:123@cluster0.8cy7rgp.mongodb.net/leetcode?retryWrites=true&w=majority").then(()=>console.log("connected to backend"));
}
  
connectDB();