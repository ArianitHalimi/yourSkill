module.exports = {
    ensureAuthenticated: (req, res, next)=>{
        if (req.isAuthenticated()) {
          return next();
        }
        res.redirect('/login');
    },
    accessControl: (req,res,next)=>{
      if(req.isAuthenticated()){
        return next();
      }
      else if(!req.isAuthenticated()){
        res.redirect('/user/profile/'+req.params.id);
      }
    }
}