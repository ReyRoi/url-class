const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const registerNewUser = asyncHandler(async(req,res)=>{
    const{username,email,password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({msg: "kindly fill all details"})
    }

    const userExists  = await User.findOne({email})

    if(userExists){
        return res.status(400).json({msg: "email id already exists"})
    }

    const hashPassword =  await bcrypt.hash(password,10)

    const user = await User.create({
        username,
        password : hashPassword,
        email
    })
    if(!user){
        return res.status(400).json({msg: "user data is not valid"})
    }else{
        return res.status(200).json({id: user._id , email : email})
    }
})

const loginUser =  asyncHandler(async(req,res)=>{
    const{email,password} = req.body

    if(!email || !password){
        return res.status(400).json({msg: "kindly fill all details"})
    }

    const userExists  = await User.findOne({email})

    if(userExists && await bcrypt.compare(password,userExists.password)){
        const token = jwt.sign({
            user:{
                username : userExists.username,
                email : email,
                password :password,
                id: userExists._id

            }
        },
        process.env.JWT_SECRET,
        {expiresIn : '1h'}
        )

        res.cookie('token',token)
        res.status(200).json({token})
    }else{
        res.status(400).json({msg : "email and password not valid"})
    }

})

const logoutUser =  asyncHandler(async(req,res)=>{
    res.clearCookie('token',{path:'/'})
    res.status(200).json({msg: "Successfuly logged out"})
})

module.exports = {registerNewUser ,loginUser ,logoutUser}
