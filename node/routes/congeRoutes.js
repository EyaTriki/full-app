const express = require("express");
const router = express.Router();
const {
    getConges,
     createConge,
     getConge,
     updateConge,
     deleteConge
}=require ("../controllers/congeController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getConges).post(createConge);
router.route("/:id").get(getConge).put(updateConge).delete(deleteConge);

module.exports=router;