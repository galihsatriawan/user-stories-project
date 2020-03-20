const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// Create express app
const app = express();
app.use(cors());
// parse request of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse request of content-type - application/json
app.use(bodyParser.json());

//Configuring database
const db = require('./config/connection');
const mongoose = require('mongoose');
const port = process.env.PORT || 9000;
const dbConnection = db.DBCONNECTION;

// Import routes
var apiRoutes = require("./routes/api-routes");
app.use('/api',apiRoutes);

// define a simple route
app.get('/',(req,res)=>{
    res.json({"message":"Welcome to Tester Application"});
});

// listen for requests
app.listen(port,()=>{
    console.log("Server is Running on Port 9000")
});
