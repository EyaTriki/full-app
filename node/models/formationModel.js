const mongoose =require("mongoose");
const documentsSchema = mongoose.Schema({
  employe_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Employe",
  }, 
  dure: {
    type: String,
  },
  raison:{
    type:String,
    required:true,
  },
  debut:{
    type:Date,
  },
  fin:{
    type:Date,
  },
  desc: {
    type: String,
  },
  type: {
    type: String,
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
module.exports = mongoose.model("Formation",formationSchema);