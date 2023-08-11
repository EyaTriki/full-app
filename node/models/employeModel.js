const mongoose =require("mongoose");
const employeSchema = mongoose.Schema({
  name:{
    type:String,
   // required:[true, "Please add the employe name"],
  },
  role:{
    type:String,
  }, 
  email:{
    type:String,
    required:true,
  },
  phone:{
    type:String,
    //required:[true, "Please add the phone number"],
  },
  image:{
    type:String,
  }, 
  password:{
    type:String,
    required:[true, "Please add a password"],
  },
  joining:{
    type:Date,
  }, 
  birth:{
    type:Date,
  }, 
  notifications:[
    {
      type: String, 
    },
  ],
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
  },
   /* conges:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Conge",
  }],  */
 
},{
    timestamps:true
});
module.exports = mongoose.model("Employe",employeSchema);