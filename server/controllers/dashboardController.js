 
const urlmodel=require('../models/urlmodel')
 
 
module.exports.homepage=async (req, res)=>{
    const urlsCount=await urlmodel.countDocuments({studentId:req.session.studentId}) 
    const studentname=req.session.fullname
    try {
        res.render('dashboard',{urlsCount,studentname})
      } catch (error) { 
        console.error("Error:", error); 
      }
}   
