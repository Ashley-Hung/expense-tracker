const mongoose = require('mongoose')
const db = mongoose.connection

/* Database connection and statement */
mongoose.connect('mongodb://localhost/record-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
