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
/**
 * @swagger
 * /api/admin:
 *   post:
 *     summary: Create a new RH account
 *     description: Create a new RH account with provided username, email, and password
 *     tags: [RH Accounts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: RH account created successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               email: rh@example.com
 *       400:
 *         description: Invalid email format or password length
 *       403:
 *         description: Access denied. Admin role required.
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.post("/", verifyTokenAndAdminAuthorization, createRhAccount);
/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Get list of RH accounts
 *     description: Get a list of all registered RH accounts
 *     tags: [RH Accounts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of RH accounts retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - _id: 123456789
 *                 username: rh_user1
 *                 email: rh_user1@example.com
 *                 role: rh
 *               - _id: 987654321
 *                 username: rh_user2
 *                 email: rh_user2@example.com
 *                 role: rh
 *       403:
 *         description: Access denied. Admin role required.
 */
router.get("/", verifyTokenAndAdminAuthorization, getRhAccounts);
/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     summary: Get a single RH account
 *     description: Get information about a specific RH account by its ID
 *     tags: [RH Accounts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the RH account
 *     responses:
 *       200:
 *         description: RH account retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               username: rh_user1
 *               email: rh_user1@example.com
 *               role: rh
 *       403:
 *         description: Access denied. Admin role required.
 *       404:
 *         description: Account not found
 */
router.get("/:id", verifyTokenAndAdminAuthorization, getRhAccount);
/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     summary: Update a RH account
 *     description: Update a specific RH account by its ID with new username and email
 *     tags: [RH Accounts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the RH account to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *     responses:
 *       200:
 *         description: RH account updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 123456789
 *               username: updatedUsername
 *               email: updated@example.com
 *       403:
 *         description: Access denied. Admin role required.
 *       404:
 *         description: Account not found
 */
router.put("/:id", verifyTokenAndAdminAuthorization, updateRhAccount);
/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     summary: Delete a RH account
 *     description: Delete a specific RH account by its ID
 *     tags: [RH Accounts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the RH account to be deleted
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Account deleted successfully
 *       403:
 *         description: Access denied. Admin role required.
 *       404:
 *         description: Account not found
 */
router.delete("/:id", verifyTokenAndAdminAuthorization, deleteRhAccount);
/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: RH Login
 *     description: Log in as a registered RH user with email and password
 *     tags: [RH Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               accessToken: [access token]
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: An error occurred during login
 */
router.post("/login", rhLogin);

module.exports = router;
