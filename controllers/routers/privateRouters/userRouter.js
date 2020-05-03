const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const Idea = require('../../../models/Idea')
const {ensureAuthenticated,accessControl} = require('../../../config/ensureAuthentication')
const checkGithub = require('../../API/checkGithubLink')

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
                    ideas_array: ideas_array
                })
            }
        })
    })
})

router.get('/idea/:ideaname',ensureAuthenticated,(req,res)=>{
    Idea.findOne({Iname:req.params.ideaname},(err,ideas)=>{
        if(ideas){
            res.render('./html/user/viewIdea.ejs',{
                ideaname: ideas.Iname,
                ideadescription: ideas.description,
                ideadifficulty: ideas.difficulty,
                users_completed: ideas.users_completed.length
            })
        }else{
            res.send('404 not found')
        }
    })
})

router.post('/submit/:ideaname',ensureAuthenticated,(req,res)=>{
    User.findById(req.session.passport.user,(err,user)=>{
        Idea.findOne({Iname:req.params.ideaname},(err,ideas)=>{
            let repo = req.body.repository
            if(checkGithub(repo)){
                let userCompleted = {
                    user: user.username,
                    name:req.params.ideaname,
                    repository: repo,
                    valid: false
                }
                ideas.users_completed.push(userCompleted)
                ideas.save((err)=>{
                    if(err) throw err
                })
                res.redirect('/user/featured')
            }else{
                res.send('Invalid repository')
            }
        })
    })
})
module.exports = router
