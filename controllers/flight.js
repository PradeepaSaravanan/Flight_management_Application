const flight = require('../models/flight')

exports.createFlight = async (req,res)=>{
    try{
        const addFlight = await flight.create(req.body)
        console.log("Flight Added Successfully");
        res.status(200).json(addFlight)
    }
    catch(error){
        console.error("Error")
        res.status(500).send("Error")
    }
}

exports.getAllFlight = async(req,res)=>{
    try{
        const getFlight = await flight.find({})
        res.send(getFlight)
    }
    catch(err){
    console.error('Error getting flight', err);
    res.status(500).send('Error getting flight');
  } 
}

exports.updateFlight = async (req, res) => {
  const cId = req.params._id;
  const updatedFlight = req.body;
    console.log(updatedFlight);
  try{
    const options={new:true}
    const updateByid= await flight.findByIdAndUpdate(cId,updatedFlight,options);
    res.send({message:"Flight Updated successfully",updatedvalues:updateByid})
  }catch(err){
    console.error('Error updating Flight', err);
      res.status(500).send('Error updating Flight');
  }
};

exports.deleteFlight = async (req, res) => {
  const flightId = req.params._id;
  try{
    const flightByid= await flight.findByIdAndDelete(flightId);
    res.send({message:'Flight deleted successfully',deletePayment:flightByid});
  }catch(err){
    console.error('Error deleting flight', err);
    res.status(500).send('Error deleting flight');
  } 
};