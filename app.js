const express = require('express')
const app = express()
const indexRouter = require('./controllers/routers/indexRouter')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const path = require('path')
require('./config/passport')(passport)
require('dotenv').config()
const db = require('./config/database')
console.log('Please wait until the server starts...')

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/',indexRouter)
app.use("/style", express.static(path.join(__dirname, 'views/css')))
app.use("/javascript", express.static(path.join(__dirname, 'views/javascript')))

const port = process.env.PORT || 5000
app.listen(port,()=>{
  console.log(`Server started on port ${port}...`)
})
