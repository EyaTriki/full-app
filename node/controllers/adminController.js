const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const createRhAccount = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
  
    if (req.user.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admin role required." });
      return;
    }
  
   
    //const hashedPassword = await bcrypt.hash(password, 10);
    const rhUser = await User.create({
      username,
      email,
      role: "rh",
      password,
    });
  
    res.status(201).json({ _id: rhUser.id, email: rhUser.email });
  });

  const generateAccessToken = (user) => {
    return jwt.sign( {user: {
      id: user.id,
   } }, "mySecretKey", {
      expiresIn: "1h",
    });
  };
  const rhLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    try {
      
      const rh = await User.findOne({ email });
  
      if (!rh) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const trimmedPassword = String(password).trim();
      const normalizedStoredPassword = String(rh.password).trim();
  
      console.log("Provided email:", email);
      console.log("Trimmed password:", trimmedPassword);
      console.log("Normalized stored password:", normalizedStoredPassword);
      
      console.log("Password match:", trimmedPassword === normalizedStoredPassword);
  
      if ( trimmedPassword !== normalizedStoredPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Generate an access token
     /*  const accessToken = jwt.sign({ employeeId: employee._id }, "mySecretKey", { expiresIn: "1h" });
      console.log(employee._id)
      res.status(200).json({ accessToken }); */
      const accessToken = generateAccessToken (rh) ;
      
  
      res.status(200).json({ accessToken });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "An error occurred during login" });
    }
  });

  const getRhAccounts = asyncHandler(async (req, res) => {
  /*   // Check if the logged in user is an admin
    if (req.user.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admin role required." });
      return;
    }
   */
    const rhAccounts = await User.find({ role: "rh" });
  
    res.status(200).json(rhAccounts);
  });


  const updateRhAccount = asyncHandler(async (req, res) => {
    const { username, email } = req.body;
    const accountId = req.params.id;
  
   /*  // Check if the logged in user is an admin
    if (req.user.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admin role required." });
      return;
    }
   */
    const updatedAccount = await User.findByIdAndUpdate(
      accountId,
      { username, email },
      { new: true } // Return the updated document
    );
  
    if (!updatedAccount) {
      res.status(404).json({ message: "Account not found" });
      return;
    }
  
    res.status(200).json(updatedAccount);
  });


  const deleteRhAccount = asyncHandler(async (req, res) => {
    const accountId = req.params.id;
  
   /*  // Check if the logged in user is an admin
    if (req.user.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admin role required." });
      return;
    } */
  
    const deletedAccount = await User.findByIdAndDelete(accountId);
  
    if (!deletedAccount) {
      res.status(404).json({ message: "Account not found" });
      return;
    }
  
    res.status(200).json({ message: "Account deleted successfully" });
  });
  const getRhAccount = asyncHandler(async (req, res) => {
    const accountId = req.params.id;
  
    // Check if the logged in user is an admin
    if (req.user.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admin role required." });
      return;
    }
  
    const rhAccount = await User.findById(accountId);
  
    if (!rhAccount || rhAccount.role !== "rh") {
      res.status(404).json({ message: "Account not found" });
      return;
    }
  
    res.status(200).json(rhAccount);
  });

  module.exports = {createRhAccount,getRhAccounts,updateRhAccount,deleteRhAccount,getRhAccount,rhLogin}