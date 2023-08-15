const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv =require("dotenv").config();
const cors = require("cors")
const connectDb=require("./config/dbConnection");

connectDb();
const app = express();

const port = 5001 ;

/*  const loggerMiddleware = (req,res,next)=>{
    console.log(`${new Date()} --- Request [${req.method}] [${req.url}]`);
    next();
};
 app.use(loggerMiddleware);  */
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.json());
app.use("/api/conges" , require ("./routes/congeRoutes"));
app.use("/api/employes" , require ("./routes/employeRoutes"));
app.use("/api/users" , require ("./routes/userRoutes"));
app.use("/api/resignations" , require ("./routes/resignationRoutes"));
app.use("/api/remotes" , require ("./routes/remoteRoutes"));
app.use("/api/formations" , require ("./routes/formationRoutes"));


app.use(errorHandler);

app.listen(port, ()=>{
    console.log (`server is running on port: ${port}`);
})