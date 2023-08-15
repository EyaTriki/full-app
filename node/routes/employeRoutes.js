const express = require("express");
const router = express.Router();
const {
    getEmployes,
     createEmploye,
     getEmploye,
     updateEmploye,
     employeeLogin,
     deleteEmploye
}=require ("../controllers/employeController");
const validateToken = require("../middleware/validateTokenHandler");
//const validateToken1 = require("../middleware/validateTokenHandler");
//const verifyTokenAndAuthorization = require("../middleware/validateTokenHandler");



//router.use(validateToken);
//router.use(verifyTokenAndAuthorization);
 /* router.use((req, res, next) => {
    if (req.path === '/login') {
      // Skip the middleware for the login route
      next();
    } else {
      // Apply the middleware for other routes
      validateToken(req, res, next);
    }
  });  */
router.get("/",validateToken,getEmployes)
router.post("/login", employeeLogin);
router.post("/",validateToken,createEmploye)
//router.route("/").post(createEmploye);
//router.route("/:id").get(getEmploye).put(updateEmploye)
router.get("/:id",validateToken,getEmploye)
router.put("/:id",validateToken,updateEmploye)
router.delete("/:id" ,validateToken,deleteEmploye);

module.exports=router;