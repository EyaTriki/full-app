const express = require("express");
const {
   registerUser,
  currentUser, 
  logoutUser,
  loginUser,
  refresh
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register an admin user
 *     description: Register a new admin user with provided username, email, and password
 *     tags: [Admins]
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
 *         description: Admin user registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Admin user registered successfully
 *       400:
 *         description: Invalid email format or password length
 *       409:
 *         description: User already registered with the provided email
 */
router.post("/register", registerUser);
/**
 * @swagger
 * /api/users/refresh:
 *   post:
 *     summary: Refresh access token
 *     description: Refresh the access token using a valid refresh token
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               token:
 *                 type: string
 *             required:
 *               - token
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             example:
 *               accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... // new access token
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... // new refresh token
 *       401:
 *         description: Not authenticated or invalid refresh token
 *       403:
 *         description: Refresh token is not valid
 */
router.post("/refresh", refresh);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in admin
 *     description: Log in an admin with provided email and password
 *     tags: [Admins]
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
 *         description: Admin logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               email: admin@example.com
 *               accessToken: [access token]
 *               refreshToken: [refresh token]
 *       400:
 *         description: Invalid email or password
 */
router.post("/login", loginUser);
/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Log out admin
 *     description: Log out the currently logged-in user
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               token:
 *                 type: string
 *             required:
 *               - token
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             example:
 *               message: You logged out successfully.
 *       401:
 *         description: Not authenticated or invalid token
 */
router.post("/logout", logoutUser);

router.get("/current", validateToken,currentUser);

module.exports = router;