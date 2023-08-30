const express = require("express");
const router = express.Router();
const {
    getConges,
     createConge,
     getConge,
     updateConge,
     deleteConge,
     respondToConge
}=require ("../controllers/congeController");
const validateToken1 = require("../middleware/validateTokenHandler");

const verifyTokenAndAuthorization = require("../middleware/validateTokenHandler");
router.use(validateToken1);
/**
 * @swagger
 * /api/conges:
 *   get:
 *     summary: Get list of Leaves for the logged-in employee
 *     description: Retrieve a list of leaves for the currently logged-in employee
 *     tags: [Leaves]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of leaves retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - _id: conge_id_here
 *                 employe_id: employee_id_here
 *                 startDate: "2023-08-10"
 *                 endDate: "2023-08-15"
 *                 status: Pending
 *               - _id: conge_id_here
 *                 employe_id: employee_id_here
 *                 startDate: "2023-09-01"
 *                 endDate: "2023-09-05"
 *                 status: Approved
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
 *               message: An error occurred while retrieving leaves
 */
router.get("/", validateToken1, getConges);
/**
 * @swagger
 * /api/conges:
 *   post:
 *     summary: Create a Leave Request
 *     description: Create a new leave request for the logged-in employee
 *     tags: [Leaves]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               raison:
 *                 type: string
 *               paye:
 *                 type: boolean
 *               duree:
 *                 type: string
 *               debut:
 *                 type: string
 *                 format: date
 *               fin:
 *                 type: string
 *                 format: date
 *             required:
 *               - type
 *               - debut
 *               - fin
 *           example:
 *             type: Vacation
 *             raison: Family trip
 *             paye: false
 *             duree: 5 days
 *             debut: "2023-08-20"
 *             fin: "2023-08-25"
 *     responses:
 *       201:
 *         description: Leave request created successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: conge_id_here
 *               type: Vacation
 *               raison: Family trip
 *               paye: false
 *               duree: 5 days
 *               debut: "2023-08-20"
 *               fin: "2023-08-25"
 *               reponse: Pending
 *               employe_id: employee_id_here
 *       400:
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             example:
 *               message: All fields are required!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while creating leave request
 */

router.post("/",createConge);
/**
 * @swagger
 * /api/conges/{id}:
 *   get:
 *     summary: Get a Leave Request
 *     description: Get details of a specific leave request by ID
 *     tags: [Leaves]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the leave request to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Leave request details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: conge_id_here
 *               type: Vacation
 *               raison: Family trip
 *               paye: false
 *               duree: 5 days
 *               debut: "2023-08-20"
 *               fin: "2023-08-25"
 *               reponse: Pending
 *               employe_id: employee_id_here
 *       404:
 *         description: Leave request not found
 *         content:
 *           application/json:
 *             example:
 *               message: Leave request not found!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while retrieving leave request
 */

router.get("/:id", validateToken1, getConge);
/**
 * @swagger
 * /api/conges/{id}:
 *   put:
 *     summary: Update a Leave Request
 *     description: Update details of a specific leave request by ID
 *     tags: [Leaves]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the leave request to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               raison:
 *                 type: string
 *               paye:
 *                 type: boolean
 *               duree:
 *                 type: string
 *               debut:
 *                 type: string
 *                 format: date
 *               fin:
 *                 type: string
 *                 format: date
 *             required:
 *               - type
 *           example:
 *             type: Sick Leave
 *             raison: Medical reasons
 *             paye: true
 *             duree: 3 days
 *             debut: "2023-08-25"
 *             fin: "2023-08-27"
 *     responses:
 *       200:
 *         description: Leave request details updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: conge_id_here
 *               type: Sick Leave
 *               raison: Medical reasons
 *               paye: true
 *               duree: 3 days
 *               debut: "2023-08-25"
 *               fin: "2023-08-27"
 *               reponse: Pending
 *               employe_id: employee_id_here
 *       403:
 *         description: Access denied. User doesn't have permission to update other user leave requests
 *         content:
 *           application/json:
 *             example:
 *               message: User doesn't have permission to update other user leave requests
 *       404:
 *         description: Leave request not found
 *         content:
 *           application/json:
 *             example:
 *               message: Leave request not found!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while updating leave request
 */

router.put("/:id", validateToken1, updateConge);
/**
 * @swagger
 * /api/conges/{id}:
 *   delete:
 *     summary: Delete a Leave Request
 *     description: Delete a specific leave request by ID
 *     tags: [Leaves]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the leave request to delete
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Leave request deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Leave request removed successfully!
 *       403:
 *         description: Access denied. User doesn't have permission to delete other user's leave requests
 *         content:
 *           application/json:
 *             example:
 *               message: User doesn't have permission to delete other user's leave requests
 *       404:
 *         description: Leave request not found
 *         content:
 *           application/json:
 *             example:
 *               message: Leave request not found!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while deleting leave request
 */

router.delete("/:id", validateToken1, deleteConge);
/**
 * @swagger
 * /api/conges/{id}/respond:
 *   post:
 *     summary: Respond to a Leave Request
 *     description: Respond to a specific leave request by ID
 *     tags: [Leaves]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the leave request to respond to
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               response:
 *                 type: string
 *                 enum: [Approved, Rejected]
 *               comment:
 *                 type: string
 *           required:
 *             - response
 *           example:
 *             response: Approved
 *             comment: Leave request approved
 *     responses:
 *       200:
 *         description: Leave request response updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Leave request approved successfully
 *       400:
 *         description: Bad request - Invalid response value
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid response value
 *       403:
 *         description: Access denied. User is not authorized to respond to leave requests
 *         content:
 *           application/json:
 *             example:
 *               message: You are not allowed to do that!
 *       404:
 *         description: Leave request not found
 *         content:
 *           application/json:
 *             example:
 *               message: Leave request not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while responding to leave request
 */
router.post("/:id/respond",verifyTokenAndAuthorization, respondToConge);

module.exports=router;