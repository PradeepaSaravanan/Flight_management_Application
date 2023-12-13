const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const jwtlib=require("jsonwebtoken");
const dotenv= require('dotenv');
dotenv.config({ path: "./config/config.env" });
require('colors');

const routes = require('./routes/flight')

const app = express();
const port = 5000;
app.use(express.static('./public'));
app.use(cors())
mongoose.connect('mongodb://localhost:27017/FlightManagement')
console.log("MongoDB Connection Successful".yellow.underline.bold);

app.use(bodyParser.json())
app.use(routes)

app.listen(port,()=>{
    console.log("Server Listening on port 5000".red.underline.bold);
})









app.get('/sts', (req, res) => {
    res.set( {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Headers":"*",
    "Access-Control-Allow-methods":"*"});
    const jwt = generateJWTForOTTBot();
    data = {
    jwt:jwt
    };
    res.send(JSON.stringify(data));
   })

   function generateJWTForOTTBot(){
    const payload = {
      "iat": (new Date().getTime())/1000,
      "exp": (new Date().getTime())/1000+86400,
        "aud": "https://idproxy.kore.ai/authorize",
        "iss": "cs-78c28c60-7277-5e84-874b-bf268dadf033",
      "sub": "pradeepa231999@gmail.com"
    }
    const secret = "CJVm7cZ3GnKEoSE/vrRbjTflDLYOS3ZleJcaAJL5osY=";
    var token = jwtlib.sign(payload, secret);
    return token;
  }