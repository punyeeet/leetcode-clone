require('dotenv').config()
var jwt = require('jsonwebtoken')



module.exports = {
    auth: (req,res,next) =>{
        const authHeader = req.cookies.auth;

        if(!authHeader){
            return res.status(403).json({msg: "Missing auth token"});
        }else{

            jwt.verify(authHeader,process.env.JWT_KEY,(err,decoded)=>{
                if(err){
                    res.status(401).send({msg:"Invalid Token"});
                }else{
                    next();
                }
            })

        }
    },
    adminAuth: (req,res,next)=>{
        // console.log(req);
        const authHeader = req.headers['authorization'];


        if(!authHeader){
            return res.status(403).json({msg: "Missing auth header"});
        }else{
            const token = authHeader.split(' ')[1];

            jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{

                if(err){
                    res.status(401).send({msg:"Invalid Token"});
                }else if(!decoded.user.admin){
                    res.status(401).send({msg:"Not an admin"});
                }else{
                    next();
                }
            })

        }
    }
}