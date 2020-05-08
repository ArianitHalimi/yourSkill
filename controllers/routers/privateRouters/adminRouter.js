const express = require('express')
const router = express.Router()
const User = require('../../../models/User')
const Idea = require('../../../models/Idea')
const {ensureAuthenticated,accessControl} = require('../../../config/ensureAuthentication')

router.get('/:ideaname',ensureAuthenticated,(req,res)=>{
    var userdata
    User.findById(req.session.passport.user)
    .then(user=>{
        userdata = user.data
        return Idea.find({type:req.params.ideaname})
    })
    .then(ideas=>{
        var ideas_array = []
            if(ideas.length == 0){
                //do nothing
            }
            for(var i=0;i<ideas.length;i++){
                ideas_array.push(ideas)
            }
            if(userdata.acc_type == 'admin'){
                if(ideas){
                    res.render('./html/admin/index.ejs',{
                        ideas_array: ideas_array,
                        idea_type: req.params.ideaname
                    })
                }else{
                    res.send('error')
                }
            }
    })
    .catch(err=>{
        if(err) throw err
    })
})

router.post('/add/idea',ensureAuthenticated,(req,res)=>{
    User.findById(req.session.passport.user)
    .then(user=>{
        if(user.acc_type!=='admin'){
            res.render('./html/errors/403_forbidden.ejs')
        }else{
            var idea_title = req.body.idea_title
            if(idea_title){
                var new_idea = new Idea({
                    Iname:idea_title,
                    hyperlink: '/adm/add/idea/'+idea_title
                })
                new_idea.save((err)=>{
                    if(err) throw err
                })
                res.redirect('/adm/add/idea/'+idea_title)
            }else{
                res.redirect('/adm/featured')
            }
        }
    })
    .catch(err=>{
        if(err) throw err
    })
})

router.get('/add/idea/:ideaname',ensureAuthenticated,(req,res)=>{
    let userdata
    User.findById(req.session.passport.user)
    .then(user=>{
        userdata = user
        let ideasnameS = req.params.ideaname.replace('%20',' ')
        return Idea.findOne({Iname:ideanameS})
    })
    .then(ideas=>{
        if(userdata.acc_type!=='admin'){
            res.render('./html/erros/403_forbidden.ejs')
        }else{
            if(ideas){
                res.render('./html/admin/addIdea.ejs',{
                    ideaname:ideas.Iname,
                    ideadescription: ideas.description
                })
            }else{
                res.send('404 Not found')
            }
        }
    })
})

router.post('/add/idea/:ideaname',ensureAuthenticated,(req,res)=>{
    let userdata
    User.findById(req.session.passport.user)
    .then(user=>{
        let ideanameS = req.params.ideaname.replace('%20',' ')
        userdata = user
        return Idea.findOne({Iname:ideanameS})
    })
    .then(ideas=>{
        if(userdata.acc_type!=='admin'){
            res.render('./html/errors/403_forbidden.ejs')
        }else{
            if(ideas){
                ideas.description = req.body.description
                ideas.difficulty = req.body.difficulty
                ideas.type = req.body.type
                ideas.Iname = req.body.name
                ideas.userlink = '/user/idea/'+req.body.name
                ideas.hyperlink = '/adm/add/idea/'+req.body.name
                ideas.save((err)=>{
                    if(err) throw err
                })
            }
            else{
                res.send('No data found')
            }
        }
        res.redirect('/adm/featured')
    })
})

router.post('/delete/idea/:ideaname',ensureAuthenticated,(req,res)=>{
    User.findById(req.session.passport.user)
    .then(user=>{
        if(user.acc_type == 'admin'){
            Idea.findOneAndRemove({Iname:req.params.ideaname},{useFindAndModify:false},(err,data)=>{
                if(err) throw err
                if(data){
                    console.log('One idea was deleted by admin ' + user.username + ' at ' + Date());
                }
            })
            res.redirect('/adm/featured')
        }
    })
})

router.get('/check/ideas',ensureAuthenticated,(req,res)=>{
    let userdata
    User.findById(req.session.passport.user)
    .then(user=>{
        userdata = user
        return Idea.find({})
    })
    .then(ideas=>{
        if(userdata.acc_type == 'admin'){
            if(ideas.length !== 0){
              var ideas_array = []
              for (var i = 0; i < ideas.length; i++) {
                for (var j = 0; j < ideas[i].users_completed.length; j++) {
                  if(ideas[i].users_completed[j].valid==false){
                    ideas_array.push(ideas[i].users_completed[j])
                  }
                }
              }
              res.render('./html/admin/checkIdeas.ejs',{
                  submited_ideas: ideas_array
              })
            }else{
              res.send('Error')
            }
          }
    })
})

router.get('/validate/:ideaname/:ideauser',ensureAuthenticated,(req,res)=>{
    let userdata
    let isvalid = false
    User.findById(req.session.passport.user)
    .then(user=>{
        userdata = user
        return Idea.findOne({Iname:req.params.ideaname})
    })
    .then(ideas=>{
        for(var i=0;i<ideas.users_completed.length;i++){
            if(ideas.users_completed[i].name == req.params.ideaname && ideas.users_completed[i].user == req.params.ideauser){
                ideas.users_completed[i].valid = true
                ideas.markModified('users_completed')
                ideas.save((err)=>{
                    if(err) throw err
                })
                isvalid = true
            }else{
                console.log('there was an error here')
            }
        }
        if(userdata.acc_type == 'admin'){
            if(isvalid){
                res.redirect('/adm/featured')
            }else{
                res.send('Could not find the submission')
            }
        }
    })
})

module.exports = router
