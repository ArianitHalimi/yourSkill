const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const User = require('../../../models/User.js')
const {ensureAuthenticated,accessControl} = require('../../../config/ensureAuthentication')

router.get('/register',(req,res)=>{
  res.render('./html/register.ejs',{
    error: '',
    username: '',
    email: '',
    password: '',
    cpass: ''
  })
})

router.post('/register',(req,res)=>{
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let cpass = req.body.cpassword
  if(!username || !email || !password || !cpass){
    sendError(req,res,'Please fill up all the fields')
  }
  if(password !== cpass){
    sendError(req,res,'Passwords must be the same')
  }
  if(password.length<8){
    sendError(req,res,'Passwords must be at least 8 characters')
  }
  else{
    User.findOne({$or:[{email:email},{username:username}]}).then(user => {
      if(user){
        res.render('./html/register.ejs',{
          error: 'An user with the same username or email already exists',
          username,
          email,
          password,
          cpass
        })
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

const sendError = (req,res,errorMsg) => {
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let cpass = req.body.cpassword
  res.render('./html/register.ejs',{
    error: errorMsg,
    username,
    email,
    password,
    cpass
  })
}

module.exports = router
