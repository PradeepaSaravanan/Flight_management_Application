const mongoose = require('mongoose')

const flightSchema = new mongoose.Schema(
    {
        flight_number:{
            type:String,
            trim:true,
            unique:true,
            required:[true,"Flight-Number is Required"]
        },
        seating_capacity:{
            type:Number,
            trim:true
        },
        status:{
            type:String,
            trim:true
        },
        source:{
            type:String,
            trim:true
        },
        destination:{
            type:String,
            trim:true
        },
        arrival_Time:{
            type:String,
            trim:true
        },
        departure_Time:{
            type:String,
            trim:true
        },
        travel_Date:{
            type:Date,
            trim:true
        },
        cost:{
            type:Number,
            trim:true
        }
    },
    {
        versionKey: false, 
    }
)

module.exports = mongoose.model("Flight",flightSchema)