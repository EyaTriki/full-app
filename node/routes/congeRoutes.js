const express = require("express");
const router = express.Router();
const {
    getConges,
     createConge,
     getConge,
     updateConge,
     deleteConge
}=require ("../controllers/congeController");
const validateToken1 = require("../middleware/validateTokenHandler");

router.use(validateToken1);
router.route("/").get(getConges).post(createConge);
router.route("/:id").get(getConge).put(updateConge).delete(deleteConge);

module.exports=router;