const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token,  "mySecretKey", (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});
/*  const verifyTokenAndAuthorization =asyncHandler(async(req,res,next)=>{
  validateToken(req,res,()=>{
      if( req.user.role==="HR"){
          next();
      }else{
          res.status(403).json("You are not allowed to do that!")
      }
  })
}); 
 */

module.exports =validateToken ;