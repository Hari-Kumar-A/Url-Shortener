const express=require('express')
const router=express.Router()
const authMiddleware = require('../middleware/middleware');  
 
const dashboardController=require('../controllers/dashboardController') 
const urlsController=require('../controllers/urlsController')
  
//DashboardPage
router.get('/',authMiddleware.isAuthenticated,dashboardController.homepage)
 
//urls----------------------------------------

//adding new addurl
router.get('/urls/addurl',authMiddleware.isAuthenticated,  urlsController.addUrl)
router.post('/urls/addurl',authMiddleware.isAuthenticated,  urlsController.postUrl)

//showing all urls
router.get('/urls',authMiddleware.isAuthenticated, urlsController.urlspage)

//view addurl
router.get('/urls/view/:id',authMiddleware.isAuthenticated,urlsController.viewpage)

//search urls
router.post('/urls/search',authMiddleware.isAuthenticated, urlsController.searchpage)

//delete url
router.get('/urls/delete/:id',authMiddleware.isAuthenticated, urlsController.postdeletepage)
 
 
module.exports=router
