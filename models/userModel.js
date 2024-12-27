const  mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required: true
    },
    email :{
        type:String,
        required: true,
        unique : [true,"Email already Exists"]
    },
    password :{
        type :String,
        required: true
    }
},{
    timestamps : true
})

const model = mongoose.model('user',userSchema)

module.exports = model