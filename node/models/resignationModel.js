const mongoose =require("mongoose");
const resignationSchema = mongoose.Schema({
  employe_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Employe",
  },
  raison:{
    type:String,
    required:[true, "the reason for this resignation"],
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
module.exports = mongoose.model("Resignation",resignationSchema);