const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const {ensureAuthenticated,accessControl} = require('../../../config/ensureAuthentication')

router.get('/:id',accessControl,(req,res)=>{
    User.findOne({username:req.params.id},(err,user)=>{
        if(user.acc_type == 'user'){
            res.render('./html/user/index.ejs',{
                username:user.username
            })
        }
    })
})

router.get('/idea/:ideaname',ensureAuthenticated,(req,res)=>{

})
module.exports = router