const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    flight_number:{
        type:String,
        trim:true,
        required:[true," Flight Number is required"],
    },
    customer_name:{
        type:String,
        trim:true,
        required:[true,"Name is required"],
    },
    customer_age:{
        type:Number,
        trim:true,
        required:[true,"Age is required"],
    },
    phone:{
        type:Number,
        trim:true,
        maxLength:10,
        required:[true,"Mobile number is required"],
    },
    aadhar_id:{
        type:Number,
        trim:true,
        required:[true,"Aadhar number is mandatory"],
    },
    passport_number:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        required:[true,"Email is required"]

    }
})

module.exports = mongoose.model("Booking", bookingSchema);
