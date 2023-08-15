const asyncHandler = require("express-async-handler");
const Conge = require("../models/congeModel");
const jwt = require("jsonwebtoken");
const Employe = require("../models/employeModel");


const getConges =asyncHandler(async(req,res)=>{
    const conges=await Conge.find({employe_id: req.user.id});
    res.status(200).json(conges);
})

const createConge = asyncHandler(async (req, res) => {
    try {
        console.log("Received request body:", req.body);
      const { type, raison, paye, duree, debut, fin } = req.body;
      
      if (!type || !debut || !fin) {
        res.status(400);
        throw new Error("All fields are required!");
      }
  
      const conge = await Conge.create({
        type,
        raison,
        paye,
        duree,
        debut,
        fin,
        reponse: "Pending",

        employe_id: req.user.id,
      });
  
      res.status(201).json(conge);
    } catch (error) {
      console.error("Error creating leave request:", error);
      res.status(500).json({ message: "An error occurred while creating leave request" });
    }
  });
  

const getConge = asyncHandler(async (req,res)=>{
    const conge = await  Conge.findById(req.params.id);
    console.log(req.params.id)
    if (!conge) {
        res.status(404);
      
        throw new Error ('leave request not found!');
        }
        res.status(200).json(conge);
})

const updateConge = asyncHandler(async(req,res)=>{
    const conge = await Conge.findById(req.params.id);
    if (!conge) {
        res.status(404);
        throw new Error ('leave request not found!');
        }
        console.log(conge.employe_id ,req.user.id )
        if (conge.employe_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error ("user don't have permission to update other user leave requests");
        }

    const updatedConge = await Conge.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedConge);
    console.log("Leave request updated successfully!")
})

const respondToConge = asyncHandler(async (req, res) => {
  const { response, comment } = req.body;
  const congeId = req.params.id;

  const conge = await Conge.findById(congeId);

  if (!conge) {
    res.status(404);
    throw new Error("Leave request not found");
  }

  if (response === "Approved" || response === "Rejected") {
    conge.reponse = response;
    conge.commentaireHR = comment;
    await conge.save();

    // Update the Employee's notifications array
    const employee = await Employe.findById(conge.employe_id);
    employee.notifications.push(`Your leave request has been ${response.toLowerCase()}.`);
    await employee.save();

    res.status(200).json({ message: `Leave request ${response.toLowerCase()} successfully` });
  } else {
    res.status(400);
    throw new Error("Invalid response value");
  }
});


const deleteConge = asyncHandler (async (req,res)=>{
    const conge = await Conge.findById(req.params.id);
    if (!conge) {
        res.status(404);
        throw new Error ('Leave request not found!');
        }
        if (conge.employe_id.toString() !== req.user.id){
            res.status(403);
            throw new Error ("user don't have permission to delete other user's leave requests");
        }
        await Conge.deleteOne({ _id: req.params.id });
        res.status(200).json({message:'Leave request removed successfully!'});
})

module.exports = {
    getConges,
    createConge,
    getConge,
    updateConge,
    deleteConge,
    respondToConge
  };