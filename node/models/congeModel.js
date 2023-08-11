const mongoose =require("mongoose");
const congeSchema = mongoose.Schema({
  employe_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Employe",
  },
  type: {
    type: String,
    enum: ["annuel", "maladie", "sans solde", "mariage"], 
  },
  raison:{
    type:String,
    //required:[true, "the reason for this leave"],
  },
  paye:{
    type:Boolean,
    //required:[true, "Please check the box"],
  },
  duree:{
    type:String,
  },
  debut:{
    type:String,
   // required:[true, "Please enter the start date of the leave."],
  },
  fin:{
    type:String,
    required:[true, "Please enter the end date of the leave."],
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
module.exports = mongoose.model("Conge",congeSchema);