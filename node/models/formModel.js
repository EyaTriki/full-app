const mongoose =require("mongoose");
const formSchema = mongoose.Schema({
    label:{type : String ,required: true},
    name:{type : String ,required: true},
    options:{type : [String]},
    type:{type: String}
},{
    timestamps:true
});
module.exports = mongoose.model("Form",formationSchema);