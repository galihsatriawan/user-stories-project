var mongoose = require("mongoose");
var autoincrement= require("mongodb-autoincrement");
// Setup schema
var userStorySchema = mongoose.Schema({
    storyId:{
        type:Number,
        required:true
    },
    storyName: {
        type: String,
        required: true
    },
    storyDesc: {
        type: String,
        required: true
    },
    storyPriority: String,
    storyCost : Number,
    createdDate:{
        type: Date,
        default: Date.now()
    }

});
userStorySchema.plugin(autoincrement.mongoosePlugin,{
    model:"UserStory",
    field: "storyId",
    startAt: 1,
    incrementBy: 1
});
var UserStory = module.exports = mongoose.model('UserStory',userStorySchema,'UserStories');
module.exports.get = function(callback,limit){
    UserStory.find(callback).limit(limit);
}