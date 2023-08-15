const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Employe = require("../models/employeModel");


const validateToken1 = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401);
    throw new Error("User is not authorized or token is missing");
  }
  
  token = authHeader.split(" ")[1];

  jwt.verify(token, "mySecretKey", (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "User is not authorized" });
      return; 
    }
    req.user = decoded.employeeId; 
    next();
  });
});



const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, decoded) => {
      if (err) {
        // Token is invalid or expired, try using the refresh token
        if (refreshTokens.includes(req.body.refreshToken)) {
          // Verify the refresh token and generate new tokens
          jwt.verify(req.body.refreshToken, "myRefreshSecretKey", (err, user) => {
            if (err) {
              res.status(401);
              throw new Error("Refresh token is not valid");
            }

            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            req.user = user.user;
            req.accessToken = newAccessToken;
            req.refreshToken = newRefreshToken;
            next();
          });
        } else {
          res.status(401);
          throw new Error("User is not authorized");
        }
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.status(401);
    throw new Error("User is not authorized or token is missing");
  }
});



   const verifyTokenAndAuthorization =asyncHandler(async(req,res,next)=>{
  validateToken(req,res,()=>{
      if( req.user.role==="rh"){
          next();
      }else{
          res.status(403).json("You are not allowed to do that!")
      }
  })
}); 
 /*
const verifyTokenAndAdminAuthorization =asyncHandler(async(req,res,next)=>{
  validateToken(req,res,()=>{
      if( req.user.role==="admin"){
          next();
      }else{
          res.status(403).json("You are not allowed to do that!")
      }
  })
});  */
 
module.exports =validateToken, validateToken1,verifyTokenAndAuthorization ;