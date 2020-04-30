const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  acc_type:{
    type:String,
    default:'user'
  },
  hasConfirmedEmail:{
    type:Boolean,
    default:false
  }
})

const user = mongoose.model('users',userSchema)

module.exports = user
