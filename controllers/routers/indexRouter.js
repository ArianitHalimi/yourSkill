const express = require('express')
const router = express.Router()
const loginRouter = require('./publicRouters/loginRouter')
const registerRouter = require('./publicRouters/registerRouter')
const userRouter = require('./privateRouters/userRouter')

router.get('/',(req,res)=>{
  res.render('./html/index.ejs')
})

router.use('/',loginRouter)
router.use('/',registerRouter)
router.use('/user/',userRouter)

module.exports = router
