const express = require("express");
const router = express.Router();
const {
    getResignations,
     createResignation,
     getResignation,
     updateResignation,
     deleteResignation,
     respondToResignation
}=require ("../controllers/resignationController");
const validateToken1 = require("../middleware/validateTokenHandler");

const verifyTokenAndAuthorization = require("../middleware/validateTokenHandler");
router.use(validateToken1);
router.route("/").get(getResignations).post(createResignation);
router.route("/:id").get(getResignation).put(updateResignation).delete(deleteResignation);
router.post("/:id/respond",verifyTokenAndAuthorization, respondToResignation);

module.exports=router;