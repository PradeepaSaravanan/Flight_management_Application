const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            trim:true
        },
        password:{
            type:String,
            trim:true
        }
    },
    {
        versionKey: false, 
    }
)

module.exports = mongoose.model("Login",loginSchema)