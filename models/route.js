const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema(
    {
        source:{
            type:String,
            trim:true,
            required:[true,"Source is Required"]
        },
        destination:{
            type:String,
            trim:true,
            required:[true,"Destination is Required"]
        },
        arrival_Time:{
            type:String,
            trim:true,
            required:[true,"Arrivaal Time is Required"]
        },
        departure_Time:{
            type:String,
            trim:true,
            required:[true,"Departure Time is Required"]
        },
        travel_Date:{
            type:Date,
            default:Date.now,
            trim:true,
            required:[true,"Travel Date is Required"]
        },
        cost:{
            type:Number,
            trim:true,
            required:[true,"Cost is Required"]
        }
    }
)

module.exports = mongoose.model("Route",routeSchema)