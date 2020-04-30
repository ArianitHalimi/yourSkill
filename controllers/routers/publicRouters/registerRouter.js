const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const User = require('../../../models/User.js')
const {ensureAuthenticated,accessControl} = require('../../../config/ensureAuthentication')

router.get('/register',(req,res)=>{
  res.render('./html/register.ejs')
})

router.post('/register',(req,res)=>{
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let cpass = req.body.cpassword
  let errors = []
  if(!username || !email || !password || !cpass){
    errors.push('Please fill up all the fields')
  }
  if(password !== cpass){
    errors.push('Passwords must be the same')
  }
  if(password.length<8){
    errors.push('Passwords must be at least 8 characters')
  }
  if(errors.length>0){
    res.send(errors[0])
  }
  else{
    User.findOne({email:email} || {username:username}).then(user => {
      if(user){
        errors.push('User with the same email or username already exists')
      }else{
        bcrypt.genSalt(10,(err,salt)=>{
          if(err) throw err
          bcrypt.hash(password,salt,(err,hash)=>{
            if(err) throw err
            password = hash
            const newUser = new User({
              username,
              email,
              password
            })
            newUser.save((err,data)=>{
              if(err) throw err
              console.log('A new user has joined at ' + Date());
            })
            res.redirect('/login')
          })
        })
      }
    })
  }

})
module.exports = router
