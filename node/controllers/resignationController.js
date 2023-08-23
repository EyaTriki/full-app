const asyncHandler = require("express-async-handler");
const Resignation = require("../models/resignationModel");
const Employe = require("../models/employeModel");


const getResignations =asyncHandler(async(req,res)=>{
    const resignations=await Resignation.find({employe_id: req.user.id});
    res.status(200).json(resignations);
})

const createResignation = asyncHandler(async (req, res) => {
    try {
        console.log("Received request body:", req.body);
      const { raison, date } = req.body;
      
      if (!raison|| !date) {
        res.status(400);
        throw new Error("All fields are required!");
      }
  
      const resignation = await Resignation.create({
        raison,
        date,
        reponse: "Pending",
        employe_id: req.user.id,
      });
  
      res.status(201).json(resignation);
    } catch (error) {
      console.error("Error creating resignation request:", error);
      res.status(500).json({ message: "An error occurred while creating resignation request" });
    }
  });
  
const getResignation = asyncHandler(async (req,res)=>{
    const resignation = await  Resignation.findById(req.params.id);
    console.log(req.params.id)
    if (!resignation) {
        res.status(404);
      
        throw new Error ('resignation request not found!');
        }
        res.status(200).json(resignation);
})

const updateResignation = asyncHandler(async(req,res)=>{
    const resignation = await Resignation.findById(req.params.id);
    if (!resignation) {
        res.status(404);
        throw new Error ('resignation request not found!');
        }
        console.log(resignation.employe_id ,req.user.id )
        if (resignation.employe_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error ("user don't have permission to update other user's resignation requests");
        }

    const updatedResignation = await Resignation.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedResignation);
    console.log("resignation request updated successfully!")
})

const respondToResignation = asyncHandler(async (req, res) => {
  const { response, comment } = req.body;
  const resignationId = req.params.id;

  const resignation = await Resignation.findById(resignationId);

  if (!resignation) {
    res.status(404);
    throw new Error("Resignation request not found");
  }

  if (response === "Approved" || response === "Rejected") {
    resignation.reponse = response;
    resignation.commentaireHR = comment;
    await resignation.save();

    // Update the Employee's notifications array
    const employee = await Employe.findById(resignation.employe_id);
    employee.notifications.push(`Your resignation request has been ${response.toLowerCase()}.`);
    await employee.save();

    res.status(200).json({ message: `Resignation request ${response.toLowerCase()} successfully` });
  } else {
    res.status(400);
    throw new Error("Invalid response value");
  }
});

const deleteResignation = asyncHandler (async (req,res)=>{
    const resignation = await Resignation.findById(req.params.id);
    if (!resignation) {
        res.status(404);
        throw new Error ('Resignation request not found!');
        }
        if (resignation.employe_id.toString() !== req.user.id){
            res.status(403);
            throw new Error ("user don't have permission to delete other user's resignation requests");
        }
        await Resignation.deleteOne({ _id: req.params.id });
        res.status(200).json({message:'Resignation request removed successfully!'});
})

module.exports = {
    getResignations,
    createResignation,
    getResignation,
    updateResignation,
    deleteResignation,
    respondToResignation
  };