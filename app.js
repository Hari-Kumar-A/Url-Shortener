  require('dotenv').config()
  const express=require('express') 
  const ejs=require('ejs')
  const expressLayout=require('express-ejs-layouts') 
  const methodOverride=require('method-override')
  const connectDB=require('./server/config/database')
  const session =require('express-session')
  const authMiddleware = require('./server/middleware/middleware');
  



  const app=express()
  const PORT=5000||process.env.PORT

  //connect to  database
  connectDB() 


  //session setup
  app.use(
      session({
        secret: process.env.SECRET_KEY, // Replace with your own secret key for session encryption
        resave: false,
        saveUninitialized: false,
      })
    )

  //to fetch forms data to mongodb 
  app.use(express.urlencoded({extended:true}))
  app.use(express.json())
  app.use(methodOverride('_method'))

  //to add image, css part
  app.use(express.static('public'))

  //to facilitate the pdf retrieving
  app.use('/uploads', express.static('uploads'));

  app.use(expressLayout)

  app.set('layout','./layouts/layout')
  app.set('view engine','ejs')

  
  //clearance of cache to prevent user to access using browsesr cache back button
  app.use((req, res, next) => {
      res.setHeader('Cache-Control', 'no-cache', 'no-store', 'must-revalidate');
      next();
    });


    //high security to login 
    const preventCaching = (req, res, next) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      next();
    };

  app.use(preventCaching)

  //Routes
  app.use('/login',require('./server/routes/login.js'))
  app.use('/register',require('./server/routes/register.js'))
  
  app.get('/logout', authMiddleware.isAuthenticated, (req, res) => {
      req.session.destroy((err) => {
        if (err) {
          console.log("Error destroying session:", err);
        }
        res.redirect('/login'); // Will always fire after the session is destroyed
      });
    });
    



  app.use('/', authMiddleware.isAuthenticated,require('./server/routes/student.js'))

  app.get('*',(req, res)=>{
      res.status(404).render('404')
  })
  app.listen(PORT)

  
   
        
