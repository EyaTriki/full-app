const asyncHandler = require("express-async-handler");
const Document = require("../models/documentModel");
const Employe = require("../models/employeModel");


const getDocuments =asyncHandler(async(req,res)=>{
    const documents=await Document.find({employe_id: req.user.id});
    res.status(200).json(documents);
})

const createDocument = asyncHandler(async (req, res) => {
    try {
        console.log("Received request body:", req.body);
      const { raison,date, type } = req.body;
      
      if (!raison|| !date || !type) {
        res.status(400);
        throw new Error("All fields are required!");
      }
  
      const document = await Document.create({
        raison,
        date,
        type,
        reponse: "Pending",
        employe_id: req.user.id,
      });
  
      res.status(201).json(document);
    } catch (error) {
      console.error("Error creating document request:", error);
      res.status(500).json({ message: "An error occurred while creating document request" });
    }
  });
  

const getDocument = asyncHandler(async (req,res)=>{
    const document = await  Document.findById(req.params.id);
    console.log(req.params.id)
    if (!document) {
        res.status(404);
      
        throw new Error ('document request not found!');
        }
        res.status(200).json(document);
})

const updateDocument = asyncHandler(async (req, res) => {
    try {
      const document = await Document.findById(req.params.id);
      if (!document) {
        res.status(404);
        throw new Error('Document request not found!');
      }
  
      if (document.employe_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update other user's document requests");
      }
  
      const updatedDocument= await Document.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (!updatedDocument) {
        res.status(404);
        throw new Error('Document request not found after update');
      }
  
      res.status(200).json(updatedDocument);
      console.log('Document request updated successfully!');
    } catch (error) {
      console.error('Error updating document request:', error);
      res.status(500).json({ message: 'An error occurred while updating document request' });
    }
  });
  

const respondToDocument = asyncHandler(async (req, res) => {
  const { response, comment } = req.body;
  const documentId = req.params.id;

  const document = await Document.findById(documentId);

  if (!document) {
    res.status(404);
    throw new Error("Document request not found");
  }

  if (response === "Approved" || response === "Rejected") {
    document.reponse = response;
    document.commentaireHR = comment;
    await document.save();

    // Update the Employee's notifications array
    const employee = await Employe.findById(document.employe_id);
    employee.notifications.push(`Your document request has been ${response.toLowerCase()}.`);
    await employee.save();

    res.status(200).json({ message: `Document request ${response.toLowerCase()} successfully` });
  } else {
    res.status(400);
    throw new Error("Invalid response value");
  }
});


const deleteDocument = asyncHandler (async (req,res)=>{
    const document = await Document.findById(req.params.id);
    if (!document) {
        res.status(404);
        throw new Error (' Document request not found!');
        }
        if (document.employe_id.toString() !== req.user.id){
            res.status(403);
            throw new Error ("user don't have permission to delete other user's document requests");
        }
        await Document.deleteOne({ _id: req.params.id });
        res.status(200).json({message:'Document request removed successfully!'});
})

module.exports = {
    getDocuments,
    createDocument,
    getDocument,
    updateDocument,
    deleteDocument,
    respondToDocument
  };