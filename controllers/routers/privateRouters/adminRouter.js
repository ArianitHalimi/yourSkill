const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const {ensureAuthenticated,accessControl} = require('../../../config/ensureAuthentication')

router.get('/:ideaname',accessControl,(req,res)=>{
    User.findById(req.session.passport.user,(err,user)=>{
        var ideas_array = []
        Idea.find({type:req.params.ideaname},(err,ideas)=>{
            if(ideas.length == 0){
                //do nothing
            }
            for(var i=0;i<ideas.length;i++){
                ideas_array.push(ideas)
            }
            if(user.acc_type == 'admin'){
                res.render('./html/admin/index.ejs',{
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

router.post('/add/idea',ensureAuthenticated,(req,res)=>{
    User.findById(req.session.passport.user,(err,user)=>{
        if(user.acc_type!=='admin'){
            res.render('./html/errors/403_forbidden.ejs')
        }else{
            var idea_title = req.body.idea_title
            res.redirect('/add/idea/'+idea_title)
        }
    })
})
module.exports = router