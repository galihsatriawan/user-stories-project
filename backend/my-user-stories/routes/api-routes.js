var express = require('express');
var router = express.Router();

router.get("/",(req,res)=>{
    res.json({
        "status":"Success",
        "message":"Welcome to our API"
    });
});
//Import User Story Controller
var userStoryController = require("../controllers/UserStoryController");
router.route("/user_story")
    .get(userStoryController.index)
    .post(userStoryController.new);
router.route("/user_stories")
    .get(userStoryController.getComplete);

router.route("/user_story/:story_id")
    // .get(userStoryController.get)
    .delete(userStoryController.delete)
    .patch(userStoryController.update)
    .get(userStoryController.getDetails);

var testAcceptanceController = require("../controllers/TestAcceptanceController");
router.route("/test_acceptance")
    .get(testAcceptanceController.index)
    .post(testAcceptanceController.new);

router.route("/test_acceptance/:taId")
    .patch(testAcceptanceController.update)
    .delete(testAcceptanceController.delete);


module.exports = router;