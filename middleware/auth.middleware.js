const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = async(req, res, next)=>{
    try {
    const token = req.headers?.authorization.split(" ")[1];
    console.log(token);
    
        if(token){
            jwt.verify(token, process.env.secret, (err, decoded)=>{
                if(err) throw new Error("token is not correct")
                console.log(decoded); //userDetails bcz payload is made up of user details in our code.
                    req.body.userId = decoded.userId;
                    req.body.username = decoded.username
                    next();
            })
        }else{
            return res.status(500).json({message:"Token is not provided"}) 
        }    
    } catch (error) {
       return res.status(500).json({error:error.message}) 
    }
    
}

module.exports = auth