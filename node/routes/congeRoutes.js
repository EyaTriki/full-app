const express = require("express");
const router = express.Router();
const {
    getConges,
     createConge,
     getConge,
     updateConge,
     deleteConge,
     respondToConge
}=require ("../controllers/congeController");
const validateToken1 = require("../middleware/validateTokenHandler");

const verifyTokenAndAuthorization = require("../middleware/validateTokenHandler");
router.use(validateToken1);
router.route("/").get(getConges).post(createConge);
router.route("/:id").get(getConge).put(updateConge).delete(deleteConge);
router.post("/:id/respond",verifyTokenAndAuthorization, respondToConge);

module.exports=router;