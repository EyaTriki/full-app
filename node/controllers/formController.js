const Form = require('../models/formModel')


const formController ={
    getForm: (req,res)=>{

    },

    addForm: (req,res)=>{
        const {label , type , name , options} = req.body;
        const form = new Form({label , type, name , options})
    }
}