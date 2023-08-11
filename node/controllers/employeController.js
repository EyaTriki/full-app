const asyncHandler = require("express-async-handler");
const Employe = require("../models/employeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getEmployes =asyncHandler(async(req,res)=>{
    const employes=await Employe.find({});
    res.status(200).json(employes);
})

const createEmploye = asyncHandler(async (req, res) => {
  console.log("the req body is:", req.body);
  const { image, name, role, email, phone, password, joining, birth } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and Password are required!");
  }

  try {
    // Vérifiez si un employé avec la même adresse e-mail existe déjà
    const existingEmployee = await Employe.findOne({ email: email.toLowerCase() });

    if (existingEmployee) {
      res.status(400);
      throw new Error("An employee with this email already exists!");
    }

    // Créez l'employé en associant l'ID de l'utilisateur actuel
    const employe = await Employe.create({
      image,
      name,
      role,
      email,
      phone,
      password,
      joining,
      birth,
      employe_id: req.user.id, 
    });

    res.status(201).json(employe);
  } catch (error) {
    // Gérez l'erreur ici en affichant les détails de l'erreur
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "An error occurred while creating an employee" });
  }
});


const employeeLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the employee by email
    const employee = await Employe.findOne({ email });

    if (!employee) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const trimmedPassword = String(password).trim();
    const normalizedStoredPassword = String(employee.password).trim();

    console.log("Provided email:", email);
    console.log("Trimmed password:", trimmedPassword);
    console.log("Normalized stored password:", normalizedStoredPassword);
    
    console.log("Password match:", trimmedPassword === normalizedStoredPassword);

    if ( trimmedPassword !== normalizedStoredPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate an access token
    const accessToken = jwt.sign({ employeeId: employee._id }, "mySecretKey", { expiresIn: "1h" });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});



const getEmploye= asyncHandler(async (req,res)=>{
    const employe = await  Employe.findById(req.params.id);
    console.log(req.params.id)
    if (!employe) {
        res.status(404);
        console.log("mahouch mawjoud!")
        throw new Error ('Employe not found!');
        }
        res.status(200).json(employe);
})

const updateEmploye = asyncHandler(async(req,res)=>{
    const employe = await Employe.findById(req.params.id);
    if (!employe) {
        res.status(404);
        console.log("mahouch mawjoud!")
        throw new Error ('Employe not found!');
        }

        if (employe.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error ("user don't have permission to update other user employes");
        }

    const updatedEmploye = await Employe.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedEmploye);
})

const deleteEmploye = asyncHandler (async (req,res)=>{
    const employe = await Employe.findById(req.params.id);
    if (!employe) {
        res.status(404);
        console.log("mahouch mawjoud!")
        throw new Error ('Employe not found!');
        }
        if (employe.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error ("user don't have permission to delete other user employes");
        }
        await Employe.deleteOne({ _id: req.params.id });
        res.status(200).json({message:'Employe removed successfully!'});
})

module.exports = {
    getEmployes,
    createEmploye,
    getEmploye,
    updateEmploye,
    deleteEmploye,
    employeeLogin
  };