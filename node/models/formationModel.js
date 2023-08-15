const mongoose =require("mongoose");
const formationSchema = mongoose.Schema({
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
    type:String,
  },
  fin:{
    type:String,
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