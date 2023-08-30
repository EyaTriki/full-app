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
/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Get Documents
 *     description: Retrieve a list of documents for the authenticated user
 *     tags: [Documents]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of documents retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - _id: 123456789
 *                 name: Document 1
 *                 url: http://example.com/document1.pdf
 *               - _id: 987654321
 *                 name: Document 2
 *                 url: http://example.com/document2.pdf
 *       403:
 *         description: Access denied. User doesn't have permission to access documents
 *         content:
 *           application/json:
 *             example:
 *               message: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while retrieving documents
 */
router.get("/", validateToken1, getDocuments);

/**
 * @swagger
 * /api/documents:
 *   post:
 *     summary: Create a Document Request
 *     description: Create a new document request
 *     tags: [Documents]
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
 *               type:
 *                 type: string
 *             required:
 *               - raison
 *               - date
 *               - type
 *           example:
 *             raison: Document request for travel
 *             date: 2023-09-01
 *             type: Travel
 *     responses:
 *       201:
 *         description: Document request created successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               raison: Document request for travel
 *               date: 2023-09-01
 *               type: Travel
 *               reponse: Pending
 *       400:
 *         description: Bad request, missing required fields
 *         content:
 *           application/json:
 *             example:
 *               message: All fields are required!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while creating document request
 */
router.post("/", validateToken1, createDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   get:
 *     summary: Get Document Request
 *     description: Retrieve a document request by ID
 *     tags: [Documents]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the document request to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Document request retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               raison: Document request for travel
 *               date: 2023-09-01
 *               type: Travel
 *               reponse: Pending
 *       403:
 *         description: Access denied. User doesn't have permission to access document request
 *         content:
 *           application/json:
 *             example:
 *               message: You are not allowed to do that!
 *       404:
 *         description: Document request not found
 *         content:
 *           application/json:
 *             example:
 *               message: Document request not found!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while retrieving document request
 */
router.get("/:id", validateToken1, getDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   put:
 *     summary: Update Document Request
 *     description: Update a document request by ID
 *     tags: [Documents]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the document request to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DocumentUpdate'
 *     responses:
 *       200:
 *         description: Document request updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               raison: Updated document request for travel
 *               date: 2023-09-01
 *               type: Travel
 *               reponse: Pending
 *       400:
 *         description: Bad request, missing required fields
 *         content:
 *           application/json:
 *             example:
 *               message: All fields are required!
 *       403:
 *         description: Access denied. User doesn't have permission to update document request
 *         content:
 *           application/json:
 *             example:
 *               message: User doesn't have permission to update other user's document requests
 *       404:
 *         description: Document request not found
 *         content:
 *           application/json:
 *             example:
 *               message: Document request not found!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while updating document request
 */
router.put("/:id", validateToken1, updateDocument);
/**
 * @swagger
 * /api/documents/{id}:
 *   delete:
 *     summary: Delete Document Request
 *     description: Delete a document request by ID
 *     tags: [Documents]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the document request to delete
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Document request deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Document request removed successfully!
 *       403:
 *         description: Access denied. User doesn't have permission to delete document request
 *         content:
 *           application/json:
 *             example:
 *               message: You are not allowed to do that!
 *       404:
 *         description: Document request not found
 *         content:
 *           application/json:
 *             example:
 *               message: Document request not found!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while deleting document request
 */
router.delete("/:id", validateToken1, deleteDocument);
/**
 * @swagger
 * /api/documents/{id}/respond:
 *   post:
 *     summary: Respond to Document Request
 *     description: Respond to a document request by providing approval or rejection
 *     tags: [Documents]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the document request to respond to
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
 *     responses:
 *       200:
 *         description: Document request responded to successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Document request approved successfully
 *       400:
 *         description: Invalid response value
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid response value
 *       403:
 *         description: Access denied. User doesn't have permission to respond to document request
 *         content:
 *           application/json:
 *             example:
 *               message: You are not allowed to do that!
 *       404:
 *         description: Document request not found
 *         content:
 *           application/json:
 *             example:
 *               message: Document request not found!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while responding to document request
 */
router.post("/:id/respond", verifyTokenAndAuthorization, respondToDocument);

module.exports=router;