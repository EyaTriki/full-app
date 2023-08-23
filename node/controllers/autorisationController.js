const asyncHandler = require("express-async-handler");
const Autorisation = require("../models/autorisationModel");
const jwt = require("jsonwebtoken");
const Employe = require("../models/employeModel");


const getAutorisations =asyncHandler(async(req,res)=>{
    const autorisations=await Autorisation.find({employe_id: req.user.id});
    res.status(200).json(autorisations);
})

const createAutorisation = asyncHandler(async (req, res) => {
    try {
        console.log("Received request body:", req.body);
      const {  raison, date, duree } = req.body;
      if(req.user.role == "admin" || req.user.role=="rh"){
        res.status(400);
        throw new Error('you are not allowed to create request!');
      }
      if (!raison || !date || !duree) {
        res.status(400);
        throw new Error("All fields are required!");
      }
  
      const autorisation = await Autorisation.create({
        raison,
        date,
        duree,
        reponse: "Pending",
        employe_id: req.user.id,
      });
  
      res.status(201).json(autorisation);
    } catch (error) {
      console.error("Error creating autorisation request:", error);
      res.status(500).json({ message: "An error occurred while creating autorisation request" });
    }
  });
  
const getAutorisation = asyncHandler(async (req,res)=>{
    const autorisation = await  Autorisation.findById(req.params.id);
    console.log(req.params.id)
    if (!autorisation) {
        res.status(404);
      
        throw new Error ('Autorisation request not found!');
        }
        res.status(200).json(autorisation);
})

const updateAutorisation = asyncHandler(async(req,res)=>{
    const autorisation = await Autorisation.findById(req.params.id);
    if (!autorisation) {
        res.status(404);
        throw new Error ('Autorisation request not found!');
        }
        console.log(autorisation.employe_id ,req.user.id )
        if (autorisation.employe_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error ("user don't have permission to update other user autorisation requests");
        }

    const updatedAutorisation = await Autorisation.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedAutorisation);
    console.log("Autorisation request updated successfully!")
})

const respondToAutorisation = asyncHandler(async (req, res) => {
  const { response, comment } = req.body;
  const authorizationId = req.params.id;

  const autorisation = await Autorisation.findById(authorizationId);

  if (!autorisation) {
    res.status(404);
    throw new Error("Autorisation request not found");
  }

  if (response === "Approved" || response === "Rejected") {
    autorisation.reponse = response;
    autorisation.commentaireHR = comment;
    await autorisation.save();

    // Update the Employee's notifications array
    const employee = await Employe.findById(autorisation.employe_id);
    employee.notifications.push(`Your autorisation request has been ${response.toLowerCase()}.`);
    await employee.save();

    res.status(200).json({ message: `Autorisation request ${response.toLowerCase()} successfully` });
  } else {
    res.status(400);
    throw new Error("Invalid response value");
  }
});

const deleteAutorisation = asyncHandler (async (req,res)=>{
    const autorisation = await Autorisation.findById(req.params.id);
    if (!autorisation) {
        res.status(404);
        throw new Error ('Autorisation request not found!');
        }
        if (autorisation.employe_id.toString() !== req.user.id){
            res.status(403);
            throw new Error ("user don't have permission to delete other user's autorisation requests");
        }
        await Autorisation.deleteOne({ _id: req.params.id });
        res.status(200).json({message:'Autorisation request removed successfully!'});
})

module.exports = {
    getAutorisations,
    createAutorisation,
    getAutorisation,
    updateAutorisation,
    deleteAutorisation,
    respondToAutorisation
  };