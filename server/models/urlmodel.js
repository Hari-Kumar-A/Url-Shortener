const mongoose=require('mongoose')
    

const urlSchema=  mongoose.Schema({
   
    name:{
        type:String,
        required:true
    },
    studentname:{
        type:String,
        required:true
    },
    shorturl:{
        type:String,
        required:true,
        unique:true
    },
    fullurl:{
        type:String,
        required:true
    },
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'students', 
        required: true
     } 
}) 
module.exports=mongoose.model('urls', urlSchema)