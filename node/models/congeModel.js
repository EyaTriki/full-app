const mongoose =require("mongoose");
const congeSchema = mongoose.Schema({
  employe_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Employe",
  },
  raison:{
    type:String,
    required:[true, "the reason for this leave"],
  },
  paye:{
    type:Boolean,
    required:[true, "Please check the box"],
  },
  debut:{
    type:Date,
    required:[true, "Please enter the start date of the leave."],
  },
  fin:{
    type:Date,
    required:[true, "Please enter the end date of the leave."],
  },
},{
    timestamps:true
});
module.exports = mongoose.model("Conge",congeSchema);