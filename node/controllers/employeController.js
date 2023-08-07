const asyncHandler = require("express-async-handler");
const Employe = require("../models/employeModel");


const getEmployes =asyncHandler(async(req,res)=>{
    const employes=await Employe.find({});
    res.status(200).json(employes);
})

const createEmploye = asyncHandler(async (req, res) => {
    console.log("the req body is:", req.body);
    const { image,name,role,email,phone,password,joining,birth } = req.body;
    if (!image || !name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are required!");
    }
    try {
      const employe = await Employe.create({
       image,
       name,
       role,
       email,
       phone,
       password,
       joining,
       birth,
      user_id: req.user.id,
      });
      res.status(201).json(employe);
    } catch (error) {
      // Handle the error here
      console.error("Error creating employee:", error);
      res.status(500).json({ message: "Internal Server Error" });
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
            throw new Error ("user don't have permission to update other user employes");
        }
        await Employe.deleteOne({ _id: req.params.id });
        res.status(200).json({message:'Employe removed successfully!'});
})

module.exports = {
    getEmployes,
    createEmploye,
    getEmploye,
    updateEmploye,
    deleteEmploye
  };