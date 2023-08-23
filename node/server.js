const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv =require("dotenv").config();
const cors = require("cors")
const connectDb=require("./config/dbConnection");
const multer= require("multer")


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
app.use("/api/admin" , require ("./routes/adminRoutes"));
app.use("/api/resignations" , require ("./routes/resignationRoutes"));
app.use("/api/remotes" , require ("./routes/remoteRoutes"));
app.use("/api/formations" , require ("./routes/formationRoutes"));
app.use("/api/documents" , require ("./routes/documentRoutes"));
app.use("/api/autorisations" , require ("./routes/autorisationRoutes"));
app.use(express.static('uploads'));

app.use(errorHandler);


// Configure multer to store files in the 'uploads' folder
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      // if file type is image store it in images folder else store it in pdfs folder
      if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, './uploads');
      }else if (file.mimetype === 'application/pdf') {
          cb(null, './uploads');
      }else {
          cb({message: 'This file is not an image or pdf file'}, false);
      }
  },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({storage: storage});

  app.post('/api/upload', upload.single('file'), (req, res) => {

    // if file uploaded successfully return file path with public and only one backsplaysh between folders and data and succes message
    if(req.file) {
        return res.status(200).json({
            successmessage: "File uploaded successfully",
            filePath: req.file.path.replace(/\\/g, "/").replace("uploads", "")
        });
    }else {
        return res.status(500).json({
            errormessage: "Server Error"
        });
    }
    
});


app.listen(port, ()=>{
    console.log (`server is running on port: ${port}`);
})