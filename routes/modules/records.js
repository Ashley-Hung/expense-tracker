const express = require('express')
const { body, validationResult } = require('express-validator/check')
const Record = require('../../models/record')
const router = express.Router()

/* Route setting */
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
    body('amount')
      .trim()
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage('amount is required or you must enter more then 0')
  ],
  (req, res) => {
    const errors = validationResult(req)
    const record = req.body
    if (!errors.isEmpty()) {
      res.render('create', { errors: errors.mapped(), record })
    } else {
      return Record.create(record)
        .then(() => {
          res.redirect('/')
        })
        .catch(error => console.log(error))
    }
  }
)

module.exports = router
