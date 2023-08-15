const express = require("express");
const router = express.Router();
const {
    getFormations,
     createFormation,
     getFormation,
     updateFormation,
     deleteFormation,
     respondToFormation
}=require ("../controllers/formationController");
const validateToken1 = require("../middleware/validateTokenHandler");

const verifyTokenAndAuthorization = require("../middleware/validateTokenHandler");
router.use(validateToken1);
router.route("/").get(getFormations).post(createFormation);
router.route("/:id").get(getFormation).put(updateFormation).delete(deleteFormation);
router.post("/:id/respond",verifyTokenAndAuthorization, respondToFormation);

module.exports=router;