var testAcceptanceModel = require('../models/TestAcceptanceModel');


exports.new = (req,res)=>{
    var testAcceptance = new testAcceptanceModel();
    testAcceptance.userStoryId = req.body.storyId;
    testAcceptance.description = req.body.description;
    testAcceptance.passed = req.body.passed||false;
    testAcceptance.index = req.body.index;
    testAcceptance.testAcceptanceId = 1;
    testAcceptance.save((err,updatedTestAcceptance)=>{
        if(err) errorStatus(res,err);
            successStatus(res,updatedTestAcceptance,"Test Acceptance Created Successfully");
    });
}

exports.index = (req,res)=>{
    testAcceptanceModel.find((err,testAcceptances)=>{
        if(err) errorStatus(res,err);
        
        successStatus(res,testAcceptances,"Test Acceptance Retrieved Successfully");
    });
}

exports.get = (req,res)=>{

}

exports.update = (req,res)=>{
    var id = req.params.taId;
    testAcceptanceModel.findOne({"testAcceptanceId":id},(err,testAcceptance)=>{
        if(err) errorStatus(res,err);
        testAcceptance.userStoryId = req.body.storyId;
        testAcceptance.description = req.body.description;
        testAcceptance.passed = req.body.passed;
        testAcceptance.index = req.body.index;
        testAcceptance.testAcceptanceId = 1;
        testAcceptance.save((err,updatedTestAcceptance)=>{
            if(err) errorStatus(res,err);
            successStatus(res,updatedTestAcceptance,"Test Acceptance Updated Successfully");
        });

    })
}

exports.delete = (req,res)=>{
    var id = req.params.taId;
    testAcceptanceModel.deleteOne({"testAcceptanceId":id},(err)=>{
        if(err) errorStatus(res,err);

        successStatus(res,null,"Test Acceptance #"+id+" Deleted Successfully");
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