const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 4000
const cookieParser = require('cookie-parser')
const connectDb = require('./config/connectDb')
const Url = require('./models/urlModel')
const cors = require('cors')
const app = express()
const userRouter = require('./routes/userRoute')
const urlRouter = require('./routes/urlRoute')
const verifyToken = require('./middleware/auth')
connectDb()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))
app.use('/api/user',userRouter)
app.use('/api/url',verifyToken,urlRouter)
app.get('/:shortid',verifyToken,async(req,res)=>{
    const shortid =req.params.shortid

    const data = await Url.findOneAndUpdate(
        {
            shortid
        },
        {   
            $push:{
                history:{
                    timestamp : Date.now()
                }
            }
        }
    )
    res.redirect(data.redirectURL)
})


app.listen(process.env.PORT,()=>{
    console.log(`server is listening to the port ${process.env.PORT}`)
})

