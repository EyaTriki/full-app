const asyncHandler = require("express-async-handler");
const Formation = require("../models/formationModel");
const Employe = require("../models/employeModel");


const getFormations =asyncHandler(async(req,res)=>{
    const formations=await Formation.find({employe_id: req.user.id});
    res.status(200).json(formations);
})

const createFormation = asyncHandler(async (req, res) => {
    try {
        console.log("Received request body:", req.body);
      const { raison,debut, fin, duree , type,desc } = req.body;
      
      if (!raison|| !debut || !fin || !duree || !type) {
        res.status(400);
        throw new Error("All fields are required!");
      }
  
      const formation = await Formation.create({
        raison,
        debut,
        fin,
        duree,
        type,
        reponse: "Pending",
        employe_id: req.user.id,
        desc,
      });
  
      res.status(201).json(formation);
    } catch (error) {
      console.error("Error creating formation request:", error);
      res.status(500).json({ message: "An error occurred while creating formation request" });
    }
  });
  
const getFormation = asyncHandler(async (req,res)=>{
    const formation = await  Formation.findById(req.params.id);
    console.log(req.params.id)
    if (!formation) {
        res.status(404);
      
        throw new Error ('formation request not found!');
        }
        res.status(200).json(formation);
})

const updateFormation = asyncHandler(async (req, res) => {
    try {
      const formation = await Formation.findById(req.params.id);
      if (!formation) {
        res.status(404);
        throw new Error('Formation request not found!');
      }
  
      if (formation.employe_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update other user's formation requests");
      }
  
      const updatedFormation = await Formation.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (!updatedFormation) {
        res.status(404);
        throw new Error('Formation request not found after update');
      }
  
      res.status(200).json(updatedFormation);
      console.log('Formation request updated successfully!');
    } catch (error) {
      console.error('Error updating formation request:', error);
      res.status(500).json({ message: 'An error occurred while updating formation request' });
    }
  });
  
const respondToFormation = asyncHandler(async (req, res) => {
  const { response, comment } = req.body;
  const formationId = req.params.id;

  const formation = await Formation.findById(formationId);

  if (!formation) {
    res.status(404);
    throw new Error("Formation request not found");
  }

  if (response === "Approved" || response === "Rejected") {
    formation.reponse = response;
    formation.commentaireHR = comment;
    await formation.save();

    // Update the Employee's notifications array
    const employee = await Employe.findById(formation.employe_id);
    employee.notifications.push(`Your formation request has been ${response.toLowerCase()}.`);
    await employee.save();

    res.status(200).json({ message: `Formation request ${response.toLowerCase()} successfully` });
  } else {
    res.status(400);
    throw new Error("Invalid response value");
  }
});

const deleteFormation = asyncHandler (async (req,res)=>{
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
        res.status(404);
        throw new Error ('Formation request not found!');
        }
        if (formation.employe_id.toString() !== req.user.id){
            res.status(403);
            throw new Error ("user don't have permission to delete other user's formation requests");
        }
        await Formation.deleteOne({ _id: req.params.id });
        res.status(200).json({message:'Formation request removed successfully!'});
})

module.exports = {
    getFormations,
    createFormation,
    getFormation,
    updateFormation,
    deleteFormation,
    respondToFormation
  };