const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortid : {
        type:String,
        required: true,
        unique : true
    },
    redirectURL:{
        type:String,
    },
    history:[
        {
            timestamp : {type:Number}
        }
    ],
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref :'user'
    }
})

const model = mongoose.model('url',urlSchema)

module.exports = model