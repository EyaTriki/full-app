const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
    getEmployes,
     createEmploye,
     getEmploye,
     updateEmploye,
     employeeLogin,
     deleteEmploye,
    
}=require ("../controllers/employeController");
const validateToken = require("../middleware/validateTokenHandler");


/**
 * @swagger
 * /api/employes:
 *   get:
 *     summary: Get list of employes
 *     description: Retrieve a list of employes
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of employes retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - _id: 123456789
 *                 name: John Doe
 *                 role: Employee
 *               - _id: 987654321
 *                 name: Jane Smith
 *                 role: Manager
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized - Token missing or invalid
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while retrieving employes
 */
//router.get("/",validateToken,getEmployes)
router.get("/",getEmployes)
/**
 * @swagger
 * /api/employes/login:
 *   post:
 *     summary: Employee Login
 *     description: Authenticate an employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *           example:
 *             email: employee@example.com
 *             password: password123
 *     responses:
 *       200:
 *         description: Employee logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               accessToken: [access token]
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid email or password
 *       500:
 *         description: An error occurred during login
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred during login
 */
router.post("/login", employeeLogin);
/**
 * @swagger
 * /api/employes:
 *   post:
 *     summary: Create an Employee
 *     description: Create a new employee account
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               file:
 *                 type: string
 *               image:
 *                 type: string
 *               password:
 *                 type: string
 *               joining:
 *                 type: string
 *                 format: date
 *               birth:
 *                 type: string
 *                 format: date
 *             required:
 *               - name
 *               - role
 *               - email
 *               - password
 *           example:
 *             name: John Doe
 *             role: Employee
 *             email: employee@example.com
 *             phone: "123-456-7890"
 *             file: file.pdf
 *             image: profile.jpg
 *             password: password123
 *             joining: "2023-08-01"
 *             birth: "1990-01-15"
 *     responses:
 *       201:
 *         description: Employee account created successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: employee_id_here
 *               name: John Doe
 *               role: Employee
 *               email: employee@example.com
 *               phone: "123-456-7890"
 *               file: file.pdf
 *               image: profile.jpg
 *               joining: "2023-08-01"
 *               birth: "1990-01-15"
 *       400:
 *         description: Bad request - Invalid email format or password length
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid email format or password length
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while creating an employee
 */
//router.post("/",validateToken, createEmploye)
router.post("/",createEmploye)
/**
 * @swagger
 * /api/employes/{id}:
 *   get:
 *     summary: Get an Employee
 *     description: Get details of a specific employee by ID
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Employee details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: employee_id_here
 *               name: John Doe
 *               role: Employee
 *               email: employee@example.com
 *               phone: "123-456-7890"
 *               file: file.pdf
 *               image: profile.jpg
 *               joining: "2023-08-01"
 *               birth: "1990-01-15"
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example:
 *               message: Employe not found!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while retrieving employee
 */
router.get("/:id",validateToken,getEmploye)
/**
 * @swagger
 * /api/employes/{id}:
 *   put:
 *     summary: Update an Employee
 *     description: Update details of a specific employee by ID
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to update
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               file:
 *                 type: string
 *               image:
 *                 type: string
 *               password:
 *                 type: string
 *               joining:
 *                 type: string
 *                 format: date
 *               birth:
 *                 type: string
 *                 format: date
 *             required:
 *               - name
 *               - role
 *           example:
 *             name: Updated Name
 *             role: Manager
 *             email: updated@example.com
 *             phone: "987-654-3210"
 *             file: updated-file.pdf
 *             image: updated-profile.jpg
 *             password: updatedPassword123
 *             joining: "2023-08-15"
 *             birth: "1992-05-20"
 *     responses:
 *       200:
 *         description: Employee details updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: employee_id_here
 *               name: Updated Name
 *               role: Manager
 *               email: updated@example.com
 *               phone: "987-654-3210"
 *               file: updated-file.pdf
 *               image: updated-profile.jpg
 *               joining: "2023-08-15"
 *               birth: "1992-05-20"
 *       403:
 *         description: Access denied. User doesn't have permission to update other user's employees
 *         content:
 *           application/json:
 *             example:
 *               message: User doesn't have permission to update other user's employees
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example:
 *               message: Employe not found!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while updating employee
 */
router.put("/:id",validateToken,updateEmploye)
/**
 * @swagger
 * /api/employes/{id}:
 *   delete:
 *     summary: Delete an Employee
 *     description: Delete a specific employee by ID
 *     tags: [Employees]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to delete
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Employee removed successfully!
 *       403:
 *         description: Access denied. User doesn't have permission to delete other user's employees
 *         content:
 *           application/json:
 *             example:
 *               message: User doesn't have permission to delete other user employes
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example:
 *               message: Employe not found!
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while deleting employee
 */
router.delete("/:id" ,validateToken,deleteEmploye);

module.exports=router;