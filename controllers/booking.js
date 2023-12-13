const booking=require('../models/booking');
const flight=require('../models/flight');



exports.createCustomer=async(req,res,next)=>{
    try{
     const addAcc= await booking.create(req.body);
      res.status(201).json(addAcc);
    }catch(error){
     console.log(error.message)
     res.status(500).send({message:error.message});
    }
 }


exports.getFlightDetails=async(req,res)=>{
    try{
        const bd= await flight.find();
        res.status(200).json(bd);
     }catch(error){
         console.error(error.message);
        res.status(500).send("Internal Server Error");   
     }

}
exports.getCustomerDetails=async(req,res)=>{
    console.log(req.query);
 
    try{
        const bd= await booking.find(req.query);
        res.status(200).json(bd);
     }catch(error){
         console.error(error.message);
        res.status(500).send("Internal Server Error");   
     }

}

exports.deleteCustomerDetail=async(req,res)=>{
    try{
        const dlt= await booking.findByIdAndDelete(req.params.id);
        res.status(200).json(dlt)
    } catch(error){
      res.status(500).json({message:"Internal Server error"});
    }
}

//  exports.getFlightDetails = async(req,res,next)=>{
    
//      const {source, destination, travel_Date}=req.query;
//      try {
//         const flights = await flight.aggregate([
//         {
//           $lookup: {
//             from: "routes",
//             localField: "flight_number",
//             foreignField: "flight_number",
//             as: "flightRoute"
//           }
//         },  
//         {  
//           $unwind: "$flightRoute"  
//         },        {
//           $match: {
//             "flightRoute.source":source,  
//             "flightRoute.destination":destination
//           }  
//         },  
//         {  
//           $project: {  
//             flightNumber: "$flight_number",  
//             departure: "$flightRoute.departure_Time",  
//             arrival: "$flightRoute.arrival_Time",  
//           }
//         }]).toArray();
//         res.status(200).json({ flights });
    
//       } catch (error) {
    
//         res.status(500).json({ error: 'An error occurred while fetching flights.' });
    
//       }
    
//     }




    // db.flights.aggregate([
    //     {
    //       $match: {
    //         source:"Chennai",  
    //         destination:"Hyderabad",   
    //         travel_Date:"2023-10-20"     
    //       }  
    //     }, 
    //     {
    //       $lookup: {
    //         from: "routes",   
    //         localField: "flight_number",  
    //         foreignField: "flight_number",  
    //         as: "flightRoute"
    //       }
    //     },  
    //     {  
    //       $unwind: "$flightRoute"  
    //     }, 
    //     {  
    //       $project: {  
    //         flightNumber: "$flight_number",  
    //         departure: "$flightRoute.departure_Time",  
    //         arrival: "$flightRoute.arrival_Time",  
    //       }
    //     }]).toArray();
