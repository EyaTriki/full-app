const express = require("express");
const router = express.Router();
const {
    getDocuments,
     createDocument,
     getDocument,
     updateDocument,
     deleteDocument,
     respondToDocument
}=require ("../controllers/documentController");
const validateToken1 = require("../middleware/validateTokenHandler");

const verifyTokenAndAuthorization = require("../middleware/validateTokenHandler");
router.use(validateToken1);
router.route("/").get(getDocuments).post(createDocument);
router.route("/:id").get(getDocument).put(updateDocument).delete(deleteDocument);
router.post("/:id/respond",verifyTokenAndAuthorization, respondToDocument);

module.exports=router;