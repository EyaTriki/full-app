const express = require("express");
const router = express.Router();
const {
    getResignations,
     createResignation,
     getResignation,
     updateResignation,
     deleteResignation,
     respondToResignation
}=require ("../controllers/resignationController");
const validateToken1 = require("../middleware/validateTokenHandler");

const verifyTokenAndAuthorization = require("../middleware/validateTokenHandler");
router.use(validateToken1);
/**
 * @swagger
 * /api/resignations:
 *   get:
 *     summary: Get Resignations
 *     description: Retrieve a list of resignations
 *     tags: [Resignations]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of resignations retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - _id: 123456789
 *                 reason: Personal reasons
 *                 date: 2023-08-01
 *                 status: Pending
 *               - _id: 987654321
 *                 reason: Career change
 *                 date: 2023-07-15
 *                 status: Approved
 *       500:
 *         description: An error occurred while retrieving resignations
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while retrieving resignations
 */
router.get("/", getResignations);
/**
 * @swagger
 * /api/resignations:
 *   post:
 *     summary: Create Resignation
 *     description: Create a new resignation request
 *     tags: [Resignations]
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
 *               date:
 *                 type: string
 *                 format: date
 *             required:
 *               - raison
 *               - date
 *     responses:
 *       201:
 *         description: Resignation request created successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               raison: Personal reasons
 *               date: 2023-08-15
 *               reponse: Pending
 *       400:
 *         description: Bad request, missing or invalid fields
 *       500:
 *         description: An error occurred while creating resignation request
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while creating resignation request
 */
router.post("/", validateToken1, createResignation);
/**
 * @swagger
 * /api/resignations/{id}:
 *   put:
 *     summary: Update Resignation
 *     description: Update a resignation request by ID
 *     tags: [Resignations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: ID of the resignation request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               raison:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *             required:
 *               - raison
 *               - date
 *     responses:
 *       200:
 *         description: Resignation request updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               raison: Personal reasons (updated)
 *               date: 2023-08-15 (updated)
 *               reponse: Pending
 *       403:
 *         description: User doesn't have permission to update the request
 *       404:
 *         description: Resignation request not found
 *       500:
 *         description: An error occurred while updating the request
 */
router.put("/:id", validateToken1, updateResignation);
/**
 * @swagger
 * /api/resignations/{id}:
 *   get:
 *     summary: Get Resignation
 *     description: Get details of a resignation request by ID
 *     tags: [Resignations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: ID of the resignation request
 *     responses:
 *       200:
 *         description: Resignation request retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               raison: Personal reasons
 *               date: 2023-08-15
 *               reponse: Pending
 *       404:
 *         description: Resignation request not found
 */
router.get("/:id", validateToken1, getResignation);
/**
 * @swagger
 * /api/resignations/{id}:
 *   delete:
 *     summary: Delete Resignation
 *     description: Delete a resignation request by ID
 *     tags: [Resignations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: ID of the resignation request
 *     responses:
 *       200:
 *         description: Resignation request removed successfully
 *       403:
 *         description: User doesn't have permission to delete the request
 *       404:
 *         description: Resignation request not found
 */
router.delete("/:id", validateToken1, deleteResignation);
/**
 * @swagger
 * /api/resignations/{id}/respond:
 *   post:
 *     summary: Respond to Resignation
 *     description: Respond to a resignation request by ID
 *     tags: [Resignations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: ID of the resignation request
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
 *         description: Resignation request responded successfully
 *       400:
 *         description: Invalid response value
 *       404:
 *         description: Resignation request not found
 */
router.post("/:id/respond", verifyTokenAndAuthorization, respondToResignation);

module.exports=router;