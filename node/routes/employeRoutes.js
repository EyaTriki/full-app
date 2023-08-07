const express = require("express");
const router = express.Router();
const {
    getEmployes,
     createEmploye,
     getEmploye,
     updateEmploye,
     deleteEmploye
}=require ("../controllers/employeController");
const validateToken = require("../middleware/validateTokenHandler");
//const verifyTokenAndAuthorization = require("../middleware/validateTokenHandler");



router.use(validateToken);
//router.use(verifyTokenAndAuthorization);

router.get("/",validateToken,getEmployes)
router.post("/",validateToken,createEmploye)
//router.route("/").post(createEmploye);
//router.route("/:id").get(getEmploye).put(updateEmploye)
router.get("/:id",validateToken,getEmploye)
router.put("/:id",validateToken,updateEmploye)
router.delete("/:id" ,validateToken,deleteEmploye);

module.exports=router;