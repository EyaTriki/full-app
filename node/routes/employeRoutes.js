const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
    getEmployes,
     createEmploye,
     getEmploye,
     updateEmploye,
     employeeLogin,
     deleteEmploye,
    
}=require ("../controllers/employeController");
const validateToken = require("../middleware/validateTokenHandler");


router.get("/",validateToken,getEmployes)
router.post("/login", employeeLogin);
router.post("/",validateToken, createEmploye)
router.get("/:id",validateToken,getEmploye)
router.put("/:id",validateToken,updateEmploye)
router.delete("/:id" ,validateToken,deleteEmploye);

module.exports=router;