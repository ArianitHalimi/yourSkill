const express = require('express')
const router = express.Router()
const User = require('../../../models/User')

router.get('/user/profile/:username',(req,res)=>{
    User.findOne({username:req.params.username}).then(user=>{
        if(!user) res.render('./html/errors/404_notfound.ejs')
        res.render('./html/profile.ejs',{
            xp: user.experience,
            username: user.username
        })
    })
})

module.exports = router