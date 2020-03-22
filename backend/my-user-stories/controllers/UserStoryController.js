var userStoryModel = require("../models/UserStoryModel");

exports.new = function(req,res){
    var newUserStory = new userStoryModel();
    var body = req.body;
    newUserStory.storyName = body.name;
    newUserStory.storyDesc = body.desc;
    newUserStory.storyPriority = body.priority;
    newUserStory.storyCost = body.cost;
    newUserStory.storyId = 1; // Trigger Id
    newUserStory.save(function(err,userStory){
        if(err) res.status(500).json({
            "status":"error",
            "message":err
        });

        res.json({
            "status":"Success",
            "message":"User Story Added Successfully",
            "data":userStory
        });
    })
}

exports.index = function(req,res){
    userStoryModel.get((err,userStories)=>{
        if(err) {
            res.status(500).json({
                "status":"error",
                "message": err
            });
        }

        res.json({
            "status" : "success",
            "message": "User Stories Retrieved Successfully",
            "data":userStories
        })
    });
}

exports.get = function(req,res){
    userStoryModel.find({"storyId":req.params.story_id},function(err,userStory){
        if(err) res.status(500).json({
            "status":"error",
            "message":err
        });
        res.json({
            "status":"success",
            "data":userStory
        });
    });
}
exports.getDetails = function(req,res){
    var id = req.params.story_id;
    userStoryModel.aggregate([
        {
            $lookup : 
                {
                    from : "TestAcceptances",
                    localField : "storyId",
                    foreignField : "userStoryId",
                    as : "testAcceptance"        
                },
        },{
            $match : {
                storyId : parseInt(id)
            }
        }
    ],(err,userStory)=>{
        if(err) errorStatus(res,err)
        successStatus(res,userStory,"User Story Detail Loaded Successfully");
    });
}

exports.getComplete = (req,res)=>{
    userStoryModel.aggregate(
        [
            {
                $lookup:{
                    from : "TestAcceptances",
                    // localField : "storyId",
                    // foreignField : "userStoryId",
                    /**
                     * Join Manual
                     */
                    let:{storyId:'$storyId'},
                    pipeline:[
                        {
                            $match:{
                                $expr:{$eq:["$userStoryId","$$storyId"]}
                            }
                        },
                        {
                            $sort:{index:1}
                        }
                    ],
                    as : "testAcceptance"
                    
                }
            },
            {
                $sort:{
                    storyId : 1
                }
            }
        ],(err,userStories)=>{
            if(err) errorStatus(res,err);
            successStatus(res,userStories,"User Stories Loaded Successfully");
        }
    );
}

exports.update = function(req,res){
    var id = req.params.story_id;
    userStoryModel.findOne({"storyId":id},function(err,userStory){
        if(err) res.status(500).json({
            "status":"error",
            "message":err
        });
        
        userStory.storyName = req.body.name;
        userStory.storyDesc = req.body.desc;
        userStory.storyPriority = req.body.priority;
        userStory.storyCost = req.body.cost;
        
        userStory.save(function(err,updatedUserStory){
            if(err) res.status(500).json({
                "status":"error",
                "message":err
            });
            res.json({
                "status":"success",
                "data": updatedUserStory,
                "message":"User Story Updated Successfully"
            });
        });
        
    });
}

exports.delete = function(req,res){
    var id = req.params.story_id;
    userStoryModel.deleteOne({"storyId":id},(err)=>{
        if(err) res.status(500).json({
            "status":"error",
            "message":err
        });
        res.json({
            "status":"success",
            "message":"User Story #"+id+" removed successfully"
        });
    })
}


function errorStatus(res,err){
    res.status(500).json({
        "status":"error",
        "message":err
    });
}
function successStatus(res,data,message){
    res.json({
        "status":"success",
        "message":message,
        "data":data
    });
}