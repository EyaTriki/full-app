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
/**
 * @swagger
 * /api/autorisations:
 *   get:
 *     summary: Get list of Authorizations for the logged-in employee
 *     description: Retrieve a list of authorizations for the currently logged-in employee
 *     tags: [Authorizations]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of authorizations retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - _id: authorization_id_here
 *                 type: Remote Work
 *                 date: "2023-08-20"
 *                 status: Approved
 *               - _id: authorization_id_here
 *                 type: Vacation
 *                 date: "2023-09-01"
 *                 status: Pending
 *       401:
 *         description: User is not authorized or token is missing
 *         content:
 *           application/json:
 *             example:
 *               message: User is not authorized or token is missing
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while retrieving authorizations
 */

router.get("/", getAutorisations);
/**
 * @swagger
 * /api/autorisations:
 *   post:
 *     summary: Create an Authorization Request
 *     description: Create a new authorization request for the logged-in employee
 *     tags: [Authorizations]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               raison:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               duree:
 *                 type: string
 *             required:
 *               - raison
 *               - date
 *               - duree
 *           example:
 *             raison: Remote Work
 *             date: "2023-08-20"
 *             duree: 1 day
 *     responses:
 *       201:
 *         description: Authorization request created successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: authorization_id_here
 *               raison: Remote Work
 *               date: "2023-08-20"
 *               duree: 1 day
 *               reponse: Pending
 *               employe_id: employee_id_here
 *       400:
 *         description: Bad request - Missing required fields or unauthorized role
 *         content:
 *           application/json:
 *             example:
 *               message: All fields are required!
 *       401:
 *         description: User is not authorized or token is missing
 *         content:
 *           application/json:
 *             example:
 *               message: You are not allowed to create request!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while creating authorization request
 */
router.post("/", createAutorisation);
/**
 * @swagger
 * /api/autorisations/{id}:
 *   get:
 *     summary: Get an Authorization Request by ID
 *     description: Get details of a specific authorization request by ID
 *     tags: [Authorizations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the authorization request to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Authorization request retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: authorization_id_here
 *               raison: Remote Work
 *               date: "2023-08-20"
 *               duree: 1 day
 *               reponse: Pending
 *               employe_id: employee_id_here
 *       404:
 *         description: Authorization request not found
 *         content:
 *           application/json:
 *             example:
 *               message: Autorisation request not found!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while retrieving authorization request
 */
router.get("/:id", getAutorisation);
/**
 * @swagger
 * /api/autorisations/{id}:
 *   put:
 *     summary: Update an Authorization Request
 *     description: Update details of a specific authorization request by ID
 *     tags: [Authorizations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the authorization request to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               raison:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               duree:
 *                 type: string
 *           example:
 *             raison: Vacation
 *             date: "2023-09-01"
 *             duree: 3 days
 *     responses:
 *       200:
 *         description: Authorization request updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: authorization_id_here
 *               raison: Vacation
 *               date: "2023-09-01"
 *               duree: 3 days
 *               reponse: Pending
 *               employe_id: employee_id_here
 *       400:
 *         description: Bad request - Unauthorized role or missing fields
 *         content:
 *           application/json:
 *             example:
 *               message: All fields are required!
 *       403:
 *         description: Access denied. User doesn't have permission to update other user's authorization requests
 *         content:
 *           application/json:
 *             example:
 *               message: User don't have permission to update other user authorization requests
 *       404:
 *         description: Authorization request not found
 *         content:
 *           application/json:
 *             example:
 *               message: Autorisation request not found!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while updating authorization request
 */
router.put("/:id", updateAutorisation);
/**
 * @swagger
 * /api/autorisations/{id}:
 *   delete:
 *     summary: Delete an Authorization Request
 *     description: Delete a specific authorization request by ID
 *     tags: [Authorizations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the authorization request to delete
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Authorization request deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Authorization request removed successfully!
 *       403:
 *         description: Access denied. User doesn't have permission to delete other user's authorization requests
 *         content:
 *           application/json:
 *             example:
 *               message: User don't have permission to delete other user's autorisation requests
 *       404:
 *         description: Authorization request not found
 *         content:
 *           application/json:
 *             example:
 *               message: Autorisation request not found!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while deleting authorization request
 */
router.delete("/:id", validateToken1, deleteAutorisation);
/**
 * @swagger
 * /api/autorisations/{id}/respond:
 *   post:
 *     summary: Respond to an Authorization Request
 *     description: Respond to a specific authorization request by ID
 *     tags: [Authorizations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the authorization request to respond to
 *         required: true
 *         type: string
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
 *           example:
 *             response: Approved
 *             comment: Authorization request approved
 *     responses:
 *       200:
 *         description: Authorization request responded successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Autorisation request approved successfully
 *       400:
 *         description: Invalid response value
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid response value
 *       403:
 *         description: Access denied. User doesn't have permission to respond to authorization requests
 *         content:
 *           application/json:
 *             example:
 *               message: You are not allowed to do that!
 *       404:
 *         description: Authorization request not found
 *         content:
 *           application/json:
 *             example:
 *               message: Autorisation request not found!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while responding to authorization request
 */
router.post("/:id/respond", verifyTokenAndAuthorization, respondToAutorisation);

module.exports = router;