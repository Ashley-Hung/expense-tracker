const express = require('express')
const { body, validationResult } = require('express-validator')
const Record = require('../../models/record')
const filter = require('../../controllers/filter')
const router = express.Router()

/* Route setting */
// filter
router.get('/filter', filter.getFilterExpense)

// create
router.get('/create', (req, res) => {
  res.render('create')
})

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('name is required'),
    body('date').notEmpty().isISO8601().withMessage('date is required or the format is wrong'),
    body('category').notEmpty().withMessage('category is required'),
    body('amount').trim().notEmpty().isInt({ min: 1 }).withMessage('amount is required or you must enter more then 0')
  ],
  (req, res) => {
    const userId = req.user._id
    const errors = validationResult(req)
    const { name, category, date, amount, merchant } = req.body
    if (!errors.isEmpty()) {
      res.render('create', { errors: errors.mapped(), record })
    } else {
      return Record.create({ name, category, date, amount, merchant, userId })
        .then(() => {
          res.redirect('/')
        })
        .catch(error => res.end('somthing went wrong when posting the new record'))
    }
  }
)

// update
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id // record id

  return Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => res.end('Something went wrong when finding the record'))
})

router.put('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Record.findById({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => {
      res.end()
      console.log(error)
    })
})

// delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(error => {
      res.end()
      console.log(error)
    })
})

module.exports = router
