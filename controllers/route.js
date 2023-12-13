const rd = require('../models/flight');

exports.getAllroutes=(req,res)=>{
    rd.find({}).then(
      data=>res.status(200).send(data)
    ).catch(
      err=>{throw err;}
    );  
};

exports.addroutes=async(req,res)=>{
 try{
    var route= await rd.create(req.body)
    console.log(route);
    res.status(200).json(route);
    console.log("Added Successfully..!!!");
 }catch(err){
   res.status(500).send(err.message);
 }       
};

exports.getrouteById=async(req,res)=>{
  try{
    const rid=req.params.id;
    var g=await rd.findById(rid)
    res.status(200).json(g);
  }catch(err){
    res.status(500).send(err.message);
  }
};


exports.updateroute=async(req,res)=>{
    try{
      const rid=req.params.id;
      const updateroutes=req.body;
      var route=await rd.findByIdAndUpdate(rid,updateroutes,{new:true})
      res.status(200).json(route);
      console.log("Route Added To flight Successfully..!!!");
    }catch(err){
      res.status(500).send(err.message);
    }
};

exports.deleteroute=async(req,res)=>{
  try{
      console.log(req.params.id);
    const id=req.params.id;
    var deleteroute=await rd.findByIdAndDelete(id)
    res.status(200).send("Deleted Successfully");
    console.log("Deleted Successfully..!!!");
  }catch(err){
    res.status(500).send(err.message);
  }
};


exports.searchflight=async(req,res)=>{
  try{
    const src=req.params.source;
    const des=req.params.destination;
    var flights=await rd.find({$and:[{source:{$regex:'.*'+src+'.*'}},{destination:{$regex:'.*'+des+'.*'}}]})
    res.status(200).json(flights);
    console.log("Displayed Flights...");
  }catch(err){
    res.status(500).send(err.message);
  }
};

