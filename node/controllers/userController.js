const dotenv =require("dotenv").config();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email.match(emailRegex)) {
      res.status(400).json({ message: "Invalid email format." });
      return;
  }

  // Check password length
  if (password.length <= 8) {
      res.status(400).json({ message: "Password must be longer than 8 characters." });
      return;
  }
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    role:"admin",
    password: hashedPassword,
  
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register" });
});

let refreshTokens = [];

const refresh = asyncHandler(async (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

  //if everything is ok, create new access token, refresh token and send to user
});

const generateAccessToken = (user) => {
  return jwt.sign( {user: {
    username: user.username,
    email: user.email,
    role:user.role,
    id: user.id,
 } }, process.env.ACCESS_TOKEN_SECERT, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign( {user: {
    username: user.username,
    email: user.email,
    role:user.role,
    id: user.id,
 } }, process.env.REFRESH_TOKEN_SECERT);
};

const loginUser = asyncHandler(async(req, res) => {
  const { email, password } = req.body;
  //console.log(req.body)
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    //Generate an access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({
      email: user.email,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400).json("email or password incorrect!");
  }
});

/* const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
  console.log(req.user.email)
});  */

const currentUser = asyncHandler(async (req, res) => {
  try {
    const user = req.user; // Get the user object from the request
    res.status(200).json(user); // Send the user object as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user information" });
  }
});


const logoutUser = asyncHandler(async(req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json({ message: "You logged out successfully." });
});

module.exports = {logoutUser, loginUser, refresh ,currentUser ,registerUser}; 