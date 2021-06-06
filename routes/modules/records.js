const express = require('express')
const Record = require('../../models/record')
const filter = require('../../controllers/filter')
const { schema } = require('../../controllers/schema')
const router = express.Router()
const Ajv = require('ajv').default
const addFormats = require('ajv-formats')
const ajv = new Ajv({ allErrors: true }) // 顯示超過一個以上的 errors
addFormats(ajv)
require('ajv-errors')(ajv)

// compile validator
const validate = ajv.compile(schema)

/* Route setting */
// filter
router.get('/filter', filter.getFilterExpense)

// create
router.get('/create', (req, res) => {
  res.render('create')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, date, amount, merchant } = req.body
  let errors = []

  if (!name || !category || !date || !amount) {
    errors = [{ message: '所有欄位皆為必填' }]
    return res.render('create', { errors })
  }

  validate({ date, amount: Number(amount) })
  errors = validate.errors

  if (errors) {
    res.render('create', { name, category, date, amount, merchant, errors })
  } else {
    return Record.create({ name, category, date, amount, merchant, userId })
      .then(() => {
        res.redirect('/')
      })
      .catch(error => {
        res.render('error')
        console.error(error)
      })
  }
})

// update
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id // record id

  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      record.date = record.date.toISOString().substring(0, 10)
      res.render('edit', { record })
    })
    .catch(error => {
      res.render('error')
      console.error(error)
    })
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const record = req.body
  let errors = []
  req.body._id = req.path.slice(1)

  if (!record.name || !record.category || !record.date || !record.amount) {
    errors = [{ message: '所有欄位皆為必填' }]
    return res.render('edit', { record, errors })
  }

  validate({ date: record.date, amount: Number(record.amount) })
  errors = validate.errors

  if (errors) {
    res.render('edit', { record, errors })
  } else {
    return Record.findById({ _id, userId })
      .then(edit => {
        edit = Object.assign(edit, record)
        return edit.save()
      })
      .then(() => res.redirect('/'))
      .catch(error => {
        res.render('error')
        console.error(error)
      })
  }
})

// delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(error => {
      res.render('error')
      console.error(error)
    })
})

module.exports = router
