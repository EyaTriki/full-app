const express = require("express");
const router = express.Router();
const {
    getAutorisations,
     createAutorisation,
     getAutorisation,
     updateAutorisation,
     deleteAutorisation,
     respondToAutorisation
}=require ("../controllers/autorisationController");
const validateToken1 = require("../middleware/validateTokenHandler");

const verifyTokenAndAuthorization = require("../middleware/validateTokenHandler");

router.use(validateToken1);

router.route("/").get(getAutorisations).post(createAutorisation);
router.route("/:id").get(getAutorisation).put(updateAutorisation).delete(deleteAutorisation);

// Apply the verifyTokenAndAuthorization middleware to the /:id/respond route
router.post("/:id/respond", verifyTokenAndAuthorization, respondToAutorisation);
module.exports = router;