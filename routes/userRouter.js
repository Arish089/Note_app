const {Router} = require('express') 
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const userRouter = Router();

userRouter.post('/register', async(req, res)=>{
const {username, email, password} = req.body;
try {
    bcrypt.hash(password, 4, async(err, hashesPassword)=>{
        if(err){
            res.status(500).json({
                message:"Error while hashing the password"
            });
        }
        const user = new UserModel({username, email, password: hashesPassword});
        await user.save();
        res.status(200).json({message:"User registered successfully"})
    })
} catch (error) {
    res.status(400).json({message:"Error while registering the user",error})
}
})

userRouter.post('/login', async(req, res)=>{
    const {username, email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password, (err, result)=>{
                if(err){
                    res.status(500).json({message:err})
                }
                if(result){
                    const token = jwt.sign({userId:user._id, username:user.username},
                        process.env.secret, {expiresIn:"1h"})
                    res.status(200).send({message: "User logged in successfully", token:token})
                }else{
                    res.status(401).json({message:"Incorrect password"})
                }
            } )
        }else{
            res.status(500).json({message:"User not found"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
})

module.exports = userRouter;