const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.send('hello')
})

/* Start and Listen on the server */
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
