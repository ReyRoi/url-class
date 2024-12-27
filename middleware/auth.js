const jwt  = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(400).json({msg : "You are not logged in"})
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,decrypt)=>{
        if(err){
            return res.json({msg: "authentication failed"})
        }
        req.user = decrypt.user
        next()
    })
}

module.exports = verifyToken
