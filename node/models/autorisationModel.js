const mongoose =require("mongoose");
const autorisationSchema = mongoose.Schema({
  employe_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Employe",
  },
  raison:{
    type:String,
    required:[true, "the reason for this authorization"],
  },

  duree:{
    type:String,
    required:[true, "Please enter the number of hours."],
  },
  date:{
    type:Date,
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
module.exports = mongoose.model("Autorisation",autorisationSchema);