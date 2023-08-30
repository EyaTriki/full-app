const express = require("express");
const router = express.Router();
const {
    getFormations,
     createFormation,
     getFormation,
     updateFormation,
     deleteFormation,
     respondToFormation
}=require ("../controllers/formationController");
const validateToken1 = require("../middleware/validateTokenHandler");

const verifyTokenAndAuthorization = require("../middleware/validateTokenHandler");
router.use(validateToken1);
/**
 * @swagger
 * /api/formations:
 *   get:
 *     summary: Get Formations
 *     description: Get a list of formations for the authenticated user
 *     tags: [Formations]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Formations retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - _id: 123456789
 *                 title: Web Development Basics
 *                 date: 2023-08-15
 *                 duration: 3 days
 *               - _id: 987654321
 *                 title: Advanced JavaScript
 *                 date: 2023-09-01
 *                 duration: 5 days
 */
router.get("/", validateToken1, getFormations);
/**
 * @swagger
 * /api/formations:
 *   post:
 *     summary: Create Formation
 *     description: Create a new formation request
 *     tags: [Formations]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               raison:
 *                 type: string
 *               debut:
 *                 type: string
 *                 format: date
 *               fin:
 *                 type: string
 *                 format: date
 *               duree:
 *                 type: string
 *               type:
 *                 type: string
 *               desc:
 *                 type: string
 *             required:
 *               - raison
 *               - debut
 *               - fin
 *               - duree
 *               - type
 *     responses:
 *       201:
 *         description: Formation request created successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               raison: Professional Development
 *               debut: 2023-08-15
 *               fin: 2023-08-18
 *               duree: 3 days
 *               type: Workshop
 *               reponse: Pending
 *               employe_id: 987654321
 *               desc: Enhancing skills in web development
 *       500:
 *         description: An error occurred while creating the request
 */
router.post("/", validateToken1, createFormation);
/**
 * @swagger
 * /api/formations/{id}:
 *   get:
 *     summary: Get Formation
 *     description: Get details of a formation request by ID
 *     tags: [Formations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: ID of the formation request
 *     responses:
 *       200:
 *         description: Formation request retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               raison: Professional Development
 *               debut: 2023-08-15
 *               fin: 2023-08-18
 *               duree: 3 days
 *               type: Workshop
 *               reponse: Pending
 *               employe_id: 987654321
 *               desc: Enhancing skills in web development
 *       404:
 *         description: Formation request not found
 */
router.get("/:id", getFormation);
/**
 * @swagger
 * /api/formations/{id}:
 *   put:
 *     summary: Update Formation
 *     description: Update a formation request by ID
 *     tags: [Formations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: ID of the formation request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               raison:
 *                 type: string
 *               debut:
 *                 type: string
 *                 format: date
 *               fin:
 *                 type: string
 *                 format: date
 *               duree:
 *                 type: string
 *               type:
 *                 type: string
 *               desc:
 *                 type: string
 *             required:
 *               - raison
 *               - debut
 *               - fin
 *               - duree
 *               - type
 *     responses:
 *       200:
 *         description: Formation request updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               raison: Professional Development (updated)
 *               debut: 2023-08-15 (updated)
 *               fin: 2023-08-18 (updated)
 *               duree: 3 days (updated)
 *               type: Workshop (updated)
 *               reponse: Pending
 *               employe_id: 987654321
 *               desc: Enhancing skills in web development (updated)
 *       403:
 *         description: User doesn't have permission to update the request
 *       404:
 *         description: Formation request not found
 *       500:
 *         description: An error occurred while updating the request
 */
router.put("/:id", updateFormation);
/**
 * @swagger
 * /api/formations/{id}:
 *   delete:
 *     summary: Delete Formation
 *     description: Delete a formation request by ID
 *     tags: [Formations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: ID of the formation request
 *     responses:
 *       200:
 *         description: Formation request removed successfully
 *       403:
 *         description: User doesn't have permission to delete the request
 *       404:
 *         description: Formation request not found
 */
router.delete("/:id", deleteFormation);
/**
 * @swagger
 * /api/formations/{id}/respond:
 *   post:
 *     summary: Respond to Formation
 *     description: Respond to a formation request by ID
 *     tags: [Formations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: ID of the formation request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               response:
 *                 type: string
 *                 enum: [Approved, Rejected]
 *               comment:
 *                 type: string
 *             required:
 *               - response
 *     responses:
 *       200:
 *         description: Formation request responded successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Formation request approved successfully
 *       400:
 *         description: Invalid response value
 *       404:
 *         description: Formation request not found
 */
router.post("/:id/respond", verifyTokenAndAuthorization, respondToFormation);

module.exports=router;