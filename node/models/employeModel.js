const mongoose =require("mongoose");
const employeSchema = mongoose.Schema({

  image:{
    type:String,
  }, 
  name:{
    type:String,
    required:[true, "Please add the employe name"],
  },
  role:{
    type:String,
  }, 
  email:{
    type:String,
    required:[true, "Please add the contact email adress"],
  },
  phone:{
    type:String,
    required:[true, "Please add the phone number"],
  },
  password:{
    type:String,
  },
  joining:{
    type:String,
  }, 
  birth:{
    type:String,
  }, 
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
  },
 /*  conges:[{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Conge",
  }], */
 
},{
    timestamps:true
});
module.exports = mongoose.model("Employe",employeSchema);