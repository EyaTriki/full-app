const asyncHandler = require("express-async-handler");
const Conge = require("../models/congeModel");


const getConges =asyncHandler(async(req,res)=>{
    const conges=await Conge.find({employe_id: req.user.id});
    res.status(200).json(conges);
})

const createConge= asyncHandler(async(req,res)=>{
    console.log("the req body is:" , req.body);
    const {raison, paye,debut,fin} = req.body;
    if(!raison ||!paye ||!debut || !fin){
        res.status(400);
        throw new Error ("All filed are required!");
}
const conge = await Conge.create({
    raison,
    paye,
    debut,
    fin,
    employe_id: req.user.id,
});
res.status(201).json(conge);

})

const getConge = asyncHandler(async (req,res)=>{
    const conge = await  Conge.findById(req.params.id);
    console.log(req.params.id)
    if (!conge) {
        res.status(404);
        console.log("mahouch mawjoud!")
        throw new Error ('Conge not found!');
        }
        res.status(200).json(conge);
})

const updateConge = asyncHandler(async(req,res)=>{
    const conge = await Conge.findById(req.params.id);
    if (!conge) {
        res.status(404);
        console.log("mahouch mawjoud!")
        throw new Error ('Conge not found!');
        }

        if (conge.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error ("user don't have permission to update other user contacts");
        }

    const updatedConge = await Conge.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedConge);
})

const deleteConge = asyncHandler (async (req,res)=>{
    const conge = await Conge.findById(req.params.id);
    if (!conge) {
        res.status(404);
        console.log("mahouch mawjoud!")
        throw new Error ('Conge not found!');
        }
        if (conge.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error ("user don't have permission to update other user contacts");
        }
        await Conge.deleteOne({ _id: req.params.id });
        res.status(200).json({message:'Contact removed successfully!'});
})

module.exports = {
    getConges,
    createConge,
    getConge,
    updateConge,
    deleteConge
  };