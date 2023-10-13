// import express from 'express'
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { auth, adminAuth } = require('./middleware');
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 3001
require('./db/config')
const cookieparser = require('cookie-parser')


app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true,
}))

app.set("trust proxy" , 1);

app.use(cookieparser())


//importing model for user
const User = require('./db/User')

//import model for problems

const problems = require('./db/Problem');
const Problem = require('./db/Problem');
const cookieParser = require('cookie-parser');


const SUBMISSION = [
  {
    problemId:1,
    userId:1,
    submission:"",
    accepted:"WA"
  }
]

app.post('/signup', async function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const email = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const admin = false;

  //checking if user already exisits
  const checkDuplicate = await User.findOne({email});
  
  if(checkDuplicate!==null){
    return res.status(401).send({message:"User already exist"});
  }else{

    
    const newUser = new User ({
      name,email,admin,password
    });
    

    await newUser.save()
    .then((response)=>{

      // //jwt token
      //   const token = jwt.sign({
      //     newUser
      // },process.env.JWT_KEY);
      //   res.cookie('auth',token)
      //   // return back 200 status code to the client
        return res.status(200).json({msg:"Success"});
    }).catch(err=>{
      console.log(err);
      return res.status(400).json({
        msg:"Error creating a new user"
      })
    })
  
  }


})

app.post('/login', async function(req, res) {
  // Add logic to decode body
  // body should have email and password
  
  const email = req.body.username;
  const password = req.body.password;
  
  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  const user = await User.findOne({ email:email });
  
  if(!user){
    return res.status(404).send({message:"User doesn't exist"});
  }
  else if(user.password!==password){
    return res.status(401).send({message:"Wrong Password"});
  }
  
    const token = jwt.sign({
        user
    },process.env.JWT_KEY);
  
    // console.log(token)

  res.cookie('auth',token,{maxAge: 90000000, httpOnly: true, secure: false, overwrite: true,sameSite:'none',domain:'.puneet-leetcode-clone.netlify.app'});

  // If the password is the same, return back 200 status code to the client
  return res.status(200).json({user});
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
 
})

app.get('/questions',async function(req, res) {
  const problemArr = await problems.find();
  //return the user all the questions in the QUESTIONS array
  const filteredProblems = problemArr.map(x=>({
    problemId: x.id,
    difficulty:x.difficulty,
    acceptance:x.acceptance,
    title:x.title
  }))
  res.json({
    problems: filteredProblems,
  });
})

app.get("/problem/:id", async (req, res) => {
    const id = req.params.id;
  
    const problem = await problems.findOne({id});
  
    if (!problem) {
      return res.status(404).json({});
    }
  
    res.json({
      problem,
    });
  });

app.get("/submissions/:id",auth, function(req, res) {
   // return the users submissions for this problem
   const filterSub = SUBMISSION.filter((curr)=>{
    return curr.problemId == req.params.id && curr.userId==req.body.userId;
   })
//   return res.send(SUBMISSION);
});


app.post("/submissions",auth, function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
  const submission = req.body.submission;
  const accepted = Math.random()>0.5;
   // Store the submission in the SUBMISSION array above
  SUBMISSION.push(submission);

  return res.status(200).send({mssg: 'Submitted'});
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.
// {
//   number:201,
//   title: "Two states",
//   description: "Given an array , return the maximum of the array?",
//   testCases: [{
//       input: "[1,2,3,4,5]",
//       output: "5"
//   }]
// }


//adding question
app.post("/addQues",adminAuth,(req,res)=>{
  

  //if current user is not an admin

  // if(!USERS.find(user=>user.email===email).admin)
  //   return res.status(401).send({messg:'Users cannot add questions'});
  
  
  // const {title,description} = req.body;
  // const testCases = req.body.testCases.map((testCase) => ({
  //   input: testCase.input,
  //   output: testCase.output
  // }))

  const newQues = new problems(req.body);

  newQues.save()
  .then(savedQues => {
    
    console.log('Question saved:', savedQues);
    return res.sendStatus(200);

  })
  .catch(error => {
    console.error('Error saving question:', error);
  });
  
  
})

app.put('/updateQues',(req,res)=>{


  const id = req.body.id;
  const title = req.body.title
  const difficulty = req.body.difficulty
  const acceptance = req.body.acceptance
  const description = req.body.description

  
  Problem.updateOne({id},{$set:{
    title,description,acceptance,difficulty
  }}).then(()=>console.log('updated'))
  .catch((err)=>res.status(400).send('Failed to Update'));
  

  
})

app.delete('/deleteQues/:id',(req,res)=>{
  const id = req.params.id

  Problem.deleteOne({id}).then(
    ()=>{
      console.log(`deleted question id: ${id}`)
      return res.status(200).send("Deleted Successfully")
  }

    
  ).catch((err)=>res.status(400).send("Failed to delete"))

})



app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
  
})



app.get('/auth',(req,res)=>{
    const authHeader = req.cookies.auth;

    if(!authHeader){
        return res.status(405).json({msg: "Missing auth token"});
    }else{
        jwt.verify(authHeader,process.env.JWT_KEY,(err,decoded)=>{
            if(err){
                res.status(401).send({msg:"Invalid Token"});
            }else{
                res.status(200).json({
                  user:{...decoded}
                })
            }
        })

    }
})

app.get('/logout',(req,res)=>{
  res.clearCookie('auth', { httpOnly: true });
  res.send('Logged out successfully');
})

app.get('/',(req,res)=>{
  res.cookie('demo','124');
  res.status(200).json({msg:"all cool"})
})

