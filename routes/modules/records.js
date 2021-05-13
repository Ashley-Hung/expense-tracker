const express = require('express')
const { body, validationResult } = require('express-validator/check')
const Record = require('../../models/record')
const router = express.Router()

/* Route setting */
// filter
router.get('/filter', (req, res) => {
  const { category } = req.query
  const record = Record.aggregate([
    {
      $match: {
        category: category
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: 'name',
        as: 'categoryIcon'
      }
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$categoryIcon', 0] }, '$$ROOT'] }
      }
    },
    {
      $project: { categoryIcon: 0 }
    },
    {
      $addFields: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } }
    }
  ])

  const amount = Record.aggregate([
    {
      $match: {
        category: category
      }
    },
    {
      $group: {
        _id: null, // 不能省略
        amount: { $sum: '$amount' }
      }
    }
  ])

  Promise.all([record, amount])
    .then(([record, amount]) => {
      const totalAmount = amount[0]
      res.render('index', { totalAmount, record, category })
    })
    .catch(error => console.error(error))
})

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

// update
router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  // console.log(id)

  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id/edit', (req, res) => {
  const { id } = req.params

  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
  const { id } = req.params

  return Record.findById(id)
    .then(record => record.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
