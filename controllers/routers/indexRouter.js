const express = require('express')
const router = express.Router()
const loginRouter = require('./publicRouters/loginRouter')
const registerRouter = require('./publicRouters/registerRouter')
const userRouter = require('./privateRouters/userRouter')
const admRouter = require('./privateRouters/adminRouter')

router.get('/',(req,res)=>{
  res.render('./html/index.ejs')
})

router.use('/',loginRouter)
router.use('/',registerRouter)
router.use('/user/',userRouter)
router.use('/adm/',admRouter)

module.exports = router
