const asyncHandler = require("express-async-handler");
const Remote = require("../models/remoteModel");
const Employe = require("../models/employeModel");


const getRemotes =asyncHandler(async(req,res)=>{
    const remotes=await Remote.find({employe_id: req.user.id});
    res.status(200).json(remotes);
})

const createRemote = asyncHandler(async (req, res) => {
    try {
        console.log("Received request body:", req.body);
      const { raison,debut, fin, duree } = req.body;
      
      if (!raison|| !debut || !fin || !duree) {
        res.status(400);
        throw new Error("All fields are required!");
      }
  
      const remote = await Remote.create({
        raison,
        debut,
        fin,
        duree,
        reponse: "Pending",
        employe_id: req.user.id,
      });
  
      res.status(201).json(remote);
    } catch (error) {
      console.error("Error creating remote request:", error);
      res.status(500).json({ message: "An error occurred while creating remote request" });
    }
  });
  
const getRemote = asyncHandler(async (req,res)=>{
    const remote = await  Remote.findById(req.params.id);
    console.log(req.params.id)
    if (!remote) {
        res.status(404);
      
        throw new Error ('remote request not found!');
        }
        res.status(200).json(remote);
})

const updateRemote = asyncHandler(async (req, res) => {
    try {
      const remote = await Remote.findById(req.params.id);
      if (!remote) {
        res.status(404);
        throw new Error('Remote request not found!');
      }
  
      if (remote.employe_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update other user's remote work requests");
      }
  
      const updatedRemote = await Remote.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (!updatedRemote) {
        res.status(404);
        throw new Error('Remote request not found after update');
      }
  
      res.status(200).json(updatedRemote);
      console.log('Remote request updated successfully!');
    } catch (error) {
      console.error('Error updating remote request:', error);
      res.status(500).json({ message: 'An error occurred while updating remote request' });
    }
  });
  
const respondToRemote = asyncHandler(async (req, res) => {
  const { response, comment } = req.body;
  const remoteId = req.params.id;

  const remote = await Remote.findById(remoteId);

  if (!remote) {
    res.status(404);
    throw new Error("Remote request not found");
  }

  if (response === "Approved" || response === "Rejected") {
    remote.reponse = response;
    remote.commentaireHR = comment;
    await remote.save();

    // Update the Employee's notifications array
    const employee = await Employe.findById(remote.employe_id);
    employee.notifications.push(`Your remote work request has been ${response.toLowerCase()}.`);
    await employee.save();

    res.status(200).json({ message: `Remote request ${response.toLowerCase()} successfully` });
  } else {
    res.status(400);
    throw new Error("Invalid response value");
  }
});

const deleteRemote = asyncHandler (async (req,res)=>{
    const remote = await Remote.findById(req.params.id);
    if (!remote) {
        res.status(404);
        throw new Error ('Remote work request not found!');
        }
        if (remote.employe_id.toString() !== req.user.id){
            res.status(403);
            throw new Error ("user don't have permission to delete other user's remote work requests");
        }
        await Remote.deleteOne({ _id: req.params.id });
        res.status(200).json({message:'Remote work request removed successfully!'});
})

module.exports = {
    getRemotes,
    createRemote,
    getRemote,
    updateRemote,
    deleteRemote,
    respondToRemote
  };