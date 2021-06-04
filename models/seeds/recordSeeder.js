if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const recordList = require('./record.json')
const bcrypt = require('bcryptjs')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      })
    )
    .then(user => {
      const userId = user._id
      return Promise.all(recordList.results.map(record => Record.create(Object.assign(record, { userId }))))
    })
    .then(() => {
      console.log('insert record done...')
      return db.close()
    })
    .then(() => {
      console.log('database connection close...')
    })
})
