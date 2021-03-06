const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: {
      toMoney: number => (number === undefined ? 0 : number.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')),
      ifEquals: (select, selectValue) => (select === selectValue ? 'selected' : '')
    }
  })
)

app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(methodOverride('_method'))
app.use(routes)

/* Start and Listen on the server */
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
