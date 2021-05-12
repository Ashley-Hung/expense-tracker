const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: { toMoney: number => number.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',') }
  })
)

app.set('view engine', 'handlebars')

app.use(routes)
app.use(express.static('public'))

/* Start and Listen on the server */
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
