// uploadRoutes.js
const express = require("express");
const router = express.Router();

const { uploadFile } = require("../controllers/uploadController");
/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload File
 *     description: Upload a file
 *     tags: [File Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: file
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             example:
 *               successmessage: File uploaded successfully
 *               filePath: /public/uploads/filename.jpg
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             example:
 *               errormessage: Server Error
 */
router.post("/", uploadFile);


module.exports=router;