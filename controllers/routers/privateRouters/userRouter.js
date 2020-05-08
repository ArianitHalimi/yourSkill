const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const Idea = require('../../../models/Idea')
const {ensureAuthenticated,accessControl} = require('../../../config/ensureAuthentication')
const checkGithub = require('../../API/checkGithubLink')

router.get('/:ideaname/',ensureAuthenticated,(req,res)=>{
    let userdata
    User.findById(req.session.passport.user)
    .then(user=>{
        userdata = user
        return Idea.find({type:req.params.ideaname})
    })
    .then(ideas=>{
        var ideas_array = []
        for(var i=0;i<ideas.length;i++){
            ideas_array.push(ideas)
        }
        if(userdata.acc_type == 'user'){
            res.render('./html/user/index.ejs',{
                subject: ideas.type,
                username:userdata.username,
                ideas_array: ideas_array
            })
        }
    })
    .catch(err=>{
        if(err) throw err
    })
})

router.get('/idea/:ideaname',ensureAuthenticated,(req,res)=>{
    Idea.findOne({Iname:req.params.ideaname})
    .then(ideas=>{
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
    .catch(err=>{
        if(err) throw err
    })
})

router.post('/submit/:ideaname',ensureAuthenticated,(req,res)=>{
    var userdata
    User.findById(req.session.passport.user)
    .then(user=>{
        userdata = user
        return Idea.findOne({Iname:req.params.ideaname})
    })
    .then(ideas=>{
        if(checkGithub(repo)){
            let userCompleted = {
                user: userdata.username,
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

module.exports = router
