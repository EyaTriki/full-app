const express = require("express");
const router = express.Router();
const {
    getRemotes,
     createRemote,
     getRemote,
     updateRemote,
     deleteRemote,
     respondToRemote
}=require ("../controllers/remoteController");
const validateToken1 = require("../middleware/validateTokenHandler");

const verifyTokenAndAuthorization = require("../middleware/validateTokenHandler");
router.use(validateToken1);
/**
 * @swagger
 * /api/remotes:
 *   get:
 *     summary: Get Remote Work Requests
 *     description: Get remote work requests for the authenticated user
 *     tags: [Remote Work]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Remote work requests retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - _id: 123456789
 *                 reason: Remote work due to personal reasons
 *                 date: 2023-08-15
 *                 reponse: Pending
 *       401:
 *         description: Unauthorized user
 *       500:
 *         description: Internal server error
 */
router.get("/", validateToken1, getRemotes);
/**
 * @swagger
 * /api/remotes:
 *   post:
 *     summary: Create Remote Work Request
 *     description: Create a new remote work request for the authenticated user
 *     tags: [Remote Work]
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
 *             required:
 *               - raison
 *               - debut
 *               - fin
 *               - duree
 *     responses:
 *       201:
 *         description: Remote work request created successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               raison: Remote work due to personal reasons
 *               debut: 2023-08-15
 *               fin: 2023-08-16
 *               duree: 2 days
 *               reponse: Pending
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", validateToken1, createRemote);
/**
 * @swagger
 * /api/remotes/{id}:
 *   get:
 *     summary: Get Remote Work Request
 *     description: Get details of a remote work request by ID
 *     tags: [Remote Work]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: ID of the remote work request
 *     responses:
 *       200:
 *         description: Remote work request retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               raison: Remote work due to personal reasons
 *               debut: 2023-08-15
 *               fin: 2023-08-16
 *               duree: 2 days
 *               reponse: Pending
 *       404:
 *         description: Remote work request not found
 */
router.get("/:id", validateToken1, getRemote);
/**
 * @swagger
 * /api/remotes/{id}:
 *   put:
 *     summary: Update Remote Work Request
 *     description: Update a remote work request by ID
 *     tags: [Remote Work]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: ID of the remote work request
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
 *             required:
 *               - raison
 *               - debut
 *               - fin
 *               - duree
 *     responses:
 *       200:
 *         description: Remote work request updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               raison: Remote work due to personal reasons (updated)
 *               debut: 2023-08-15 (updated)
 *               fin: 2023-08-16 (updated)
 *               duree: 2 days (updated)
 *               reponse: Pending
 *       403:
 *         description: User doesn't have permission to update the request
 *       404:
 *         description: Remote work request not found
 *       500:
 *         description: An error occurred while updating the request
 */
router.put("/:id", validateToken1, updateRemote);
/**
 * @swagger
 * /api/remotes/{id}:
 *   delete:
 *     summary: Delete Remote Work Request
 *     description: Delete a remote work request by ID
 *     tags: [Remote Work]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: ID of the remote work request
 *     responses:
 *       200:
 *         description: Remote work request removed successfully
 *       403:
 *         description: User doesn't have permission to delete the request
 *       404:
 *         description: Remote work request not found
 */
router.delete("/:id", validateToken1, deleteRemote);
/**
 * @swagger
 * /api/remotes/{id}/respond:
 *   post:
 *     summary: Respond to Remote Work Request
 *     description: Respond to a remote work request by ID
 *     tags: [Remote Work]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: ObjectId
 *         description: ID of the remote work request
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
 *         description: Remote work request responded successfully
 *       400:
 *         description: Invalid response value
 *       404:
 *         description: Remote work request not found
 */
router.post("/:id/respond", verifyTokenAndAuthorization, respondToRemote);

module.exports=router;