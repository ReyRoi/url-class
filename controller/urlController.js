const Url = require('../models/urlModel')
const asyncHandler = require('express-async-handler')
const shortid = require('short-unique-id')
const uid = new shortid({ length: 8 });




const createShortId =asyncHandler (async(req,res)=>{
    const{url }= req.body

    const shorterid= uid.rnd()

    if(!url){
        return res.status(400).json({msg: "Kindly send a url"})
    }

    const result = await Url.create({
        shortid : shorterid,
        redirectURL : url,
        history :[],
        createdBy : req.user.id
    })

    return res.status(200).json({shortid : shorterid})
})

const getHistory = asyncHandler(async(req,res)=>{
    const history = await Url.find({createdBy : req.user.id})

    res.status(200).json({urls : history})
})

module.exports = {createShortId ,getHistory}