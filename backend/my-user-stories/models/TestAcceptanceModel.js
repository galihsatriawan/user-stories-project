var mongoose = require("mongoose");
var autoincrement = require('mongodb-autoincrement');

var testAcceptanceSchema = mongoose.Schema({
    "testAcceptanceId":{
        type:Number,
        required:true
    },
    "userStoryId":{
        type: Number,
        ref:"UserStories",
        required: true
    },
    "description":{
        type:String,
        required:true
    },
    "passed":{
        type:Boolean,
        required:true,
        default:false
    },
    "index":{
        type:Number,
        required:true
    }
});
// Set plugin
testAcceptanceSchema.plugin(autoincrement.mongoosePlugin,{
    model:"TestAcceptance",
    field:"testAcceptanceId",
    startAt:1,
    incrementBy:1,
})

// make importer
var TestAcceptance = module.exports = mongoose.model("TestAcceptance",testAcceptanceSchema,"TestAcceptances");
