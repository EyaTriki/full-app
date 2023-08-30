const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv =require("dotenv").config();
const cors = require("cors")
const connectDb=require("./config/dbConnection");
const swaggerUI = require('swagger-ui-express');
const swaggerSpecs = require('./swagger'); 

connectDb();
const app = express();
const port = process.env.PORT ;



app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use("/api/conges" , require ("./routes/congeRoutes"));
app.use("/api/employes" , require ("./routes/employeRoutes"));
app.use("/api/users" , require ("./routes/userRoutes"));
app.use("/api/admin" , require ("./routes/adminRoutes"));
app.use("/api/resignations" , require ("./routes/resignationRoutes"));
app.use("/api/remotes" , require ("./routes/remoteRoutes"));
app.use("/api/formations" , require ("./routes/formationRoutes"));
app.use("/api/documents" , require ("./routes/documentRoutes"));
app.use("/api/autorisations" , require ("./routes/autorisationRoutes"));
app.use(express.static('uploads'));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use(errorHandler);


app.listen(port, ()=>{
    console.log (`server is running on port: ${port}`);
})