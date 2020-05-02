const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const Idea = require('../../../models/Idea')
const {ensureAuthenticated,accessControl} = require('../../../config/ensureAuthentication')

router.get('/:ideaname/',accessControl,(req,res)=>{
    User.findById(req.session.passport.user,(err,user)=>{
        var ideas_array = []
        Idea.find({type:req.params.ideaname},(err,ideas)=>{
            if(ideas.length == 0){
                //do nothing
            }
            for(var i=0;i<ideas.length;i++){
                ideas_array.push(ideas)
            }
            if(user.acc_type == 'user'){
                res.render('./html/user/index.ejs',{
                    subject: ideas.type,
                    username:user.username,
                    ideas_array: ideas_array,
                    idea_title: ideas.name,
                    idea_description: ideas.description
                })
            }
        })
    })
})

router.get('/idea/:ideaname',ensureAuthenticated,(req,res)=>{

})
module.exports = router
