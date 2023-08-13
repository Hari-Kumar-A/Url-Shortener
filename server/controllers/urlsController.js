const urlmodel=require('../models/urlmodel')  
const express=require('express') 
const shortid =require('shortid') 

 

// adding url get-------------------------
module.exports.addUrl=async (req, res)=>{
  res.render('addurl')
}   

//adding url post-------------------------
module.exports.postUrl=async (req, res)=>{
  console.log(req.body)
  const makeShortUrl=shortid();
  const data={
      name:req.body.name,  
      studentname:req.session.fullname,
      studentId:req.session.studentId,
      shorturl:makeShortUrl,
      fullurl:req.body.fullurl
  }
  
  const newFile=new urlmodel(data)
  await newFile.save()
  res.redirect('/urls')
}  

//viewing all urls
module.exports.urlspage=async (req, res)=>{
    
    try {
        const urlsdata=await urlmodel.find({studentId:req.session.studentId})  
    res.render('urls',{urlsdata})
      } catch (error) {
        console.log("Error", error) 
      }
}

// viewing url
module.exports.viewpage=async (req, res)=>{
    
    try {
        const urldata=await urlmodel.findOne({ _id: req.params.id })
    res.redirect(urldata.fullurl)
      } catch (error) {
        // Handle the error here
        console.error("Error:", error);
         
      }
} 
  
// search url
module.exports.searchpage=async (req, res)=>{
   
   try {
    const searchurl=req.body.searchurl 

   const searchurldata=await urlmodel.find({
    studentId:req.session.studentId,
    $or:[
        {name:{ $regex: new RegExp(searchurl,"i")}} 
    ]
   }) 
   res.render('searchurl',{searchurldata})
  } catch (error) { 
    console.error("Error:", error); 
  }
}

//deleting url
module.exports.postdeletepage=async (req, res)=>{ 
  try {
   await urlmodel.deleteOne({ _id: req.params.id}) 
  res.redirect('/urls')
 } catch (error) { 
   console.error("Error", error); 
 }
}

 