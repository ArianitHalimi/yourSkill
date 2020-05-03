const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const session = require('express-session')
const User = require('../../../models/User')
const {ensureAuthenticated,accessControl} = require('../../../config/ensureAuthentication')
//const bodyParser = require('body-parser')

router.get('/login',(req,res)=>{
  res.render('./html/login.ejs')
})

router.post('/login',
  passport.authenticate('local'),
  function(req, res, next) {
      User.findOne({username:req.body.username},(err,user)=>{
        if(user.hasConfirmedEmail){
          if(user.acc_type==='user'){
            console.log('User ' + req.body.username + ' has logged in on ' + Date());
            res.redirect('/user/featured');
          }
          else if(user.acc_type==='admin'){
            console.log('Admin ' + req.body.username + ' has logged in on ' + Date())
            res.redirect('/adm/featured');
          }
        }else{
          res.redirect('/additional/'+user.username)
        }
      });
});

router.get('/logout', (req,res,next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router
