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

db.once('open', async () => {
	try {
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(SEED_USER.password, salt)
		const user = await User.create({ name: SEED_USER.name, email: SEED_USER.email, password: hash })
		const userId = user._id
		for (const record of recordList.results) {
			await Record.create(Object.assign(record, { userId }))
		}

		console.log('insert record done...')
		await db.close()
		console.log('database connection close...')
	} catch (error) {
		console.log(error)
	}
})
