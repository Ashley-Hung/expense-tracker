const express = require('express')
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')
const router = express.Router()

router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router
