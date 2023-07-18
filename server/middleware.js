const JWT_KEY = 'JWT_KEY'

var jwt = require('jsonwebtoken')

module.exports = {
    auth: (req,res,next) =>{
        const authHeader = req.headers["authorization"];

        if(!authHeader){
            return res.status(403).json({msg: "Missing auth header"});
        }

        const decoded = jwt.verify(authHeader,JWT_KEY);

        if(decoded && decoded.id){
            req.userId = decoded.id;
            next()
        }else{
            return res.status(401).json({
                msg:"Incorrect Token"
            });
        }
    }
}