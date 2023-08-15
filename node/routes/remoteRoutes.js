const express = require("express");
const router = express.Router();
const {
    getRemotes,
     createRemote,
     getRemote,
     updateRemote,
     deleteRemote,
     respondToRemote
}=require ("../controllers/remoteController");
const validateToken1 = require("../middleware/validateTokenHandler");

const verifyTokenAndAuthorization = require("../middleware/validateTokenHandler");
router.use(validateToken1);
router.route("/").get(getRemotes).post(createRemote);
router.route("/:id").get(getRemote).put(updateRemote).delete(deleteRemote);
router.post("/:id/respond",verifyTokenAndAuthorization, respondToRemote);

module.exports=router;