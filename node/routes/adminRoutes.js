const express = require("express");
const router = express.Router();
const {
  createRhAccount,
  getRhAccounts,
  getRhAccount,
  updateRhAccount,
  deleteRhAccount,
  rhLogin,
} = require("../controllers/adminController");

const verifyTokenAndAdminAuthorization = require("../middleware/validateTokenHandler"); 



router.post("/", verifyTokenAndAdminAuthorization, createRhAccount);
router.get("/", verifyTokenAndAdminAuthorization, getRhAccounts);
router.get("/:id", verifyTokenAndAdminAuthorization, getRhAccount);
router.put("/:id", verifyTokenAndAdminAuthorization, updateRhAccount);
router.delete("/:id", verifyTokenAndAdminAuthorization, deleteRhAccount);


router.post("/login", rhLogin);

module.exports = router;
