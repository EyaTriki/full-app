const mongoose =require("mongoose");
const documentsSchema = mongoose.Schema({
  employe_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Employe",
  },
  raison:{
    type:String,
    required:[true, "the reason for this document"],
  },
  date:{
    type:Date,
  },
  type: {
    type: String,
  enum: ["fiche de paie", "attestation","contrat","autre"], 
    
  },
   reponse:{
    type:String,
  },
  commentaireHR: {
    type: String,
  },
},{
    timestamps:true
});
module.exports = mongoose.model("Documents",documentsSchema);