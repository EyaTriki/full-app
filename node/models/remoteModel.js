const mongoose =require("mongoose");
const remoteSchema = mongoose.Schema({
  employe_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Employe",
  },
  raison:{
    type:String,
    required:[true, "the reason for the remote request"],
  },
  debut:{
    type:Date,
  },
 fin:{
    type:Date,
  },
  duree:{
    type:String,
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
module.exports = mongoose.model("Remote",remoteSchema);