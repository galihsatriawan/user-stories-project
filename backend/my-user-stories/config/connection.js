var mongoose = require('mongoose');
var dbConfig = require('./database.config');
var db = process.env.MONGODB_URL || dbConfig.develop
var connectionDB = mongoose.connect(db,{
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true,
    dbName: dbConfig.db_name
},
(err)=>{
    if(err) console.log(err);
    else console.log("DB connected successfully");
})

var DBCONNECTION = module.exports = connectionDB