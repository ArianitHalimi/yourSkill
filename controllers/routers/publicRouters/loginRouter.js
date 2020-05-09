const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const session = require('express-session')
const User = require('../../../models/User')

router.get('/login',(req,res)=>{
  res.render('./html/login.ejs')
})

router.post('/login',
  passport.authenticate('local'),
  function(req, res, next) {
      User.findOne({username:req.body.username},(err,user)=>{
        if(!user.hasConfirmedEmail) res.redirect('/additional/'+user.username);
        user.acc_type==='user' ? res.redirect('/user/featured'): res.redirect('/adm/featured')
      });
});

router.get('/logout', (req,res,next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router
