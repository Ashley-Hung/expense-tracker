const express = require('express')
const Record = require('../../models/record')

const router = express.Router()

router.get('/', (req, res) => {
  const userId = req.user._id

  const record = Record.aggregate([
    { $match: { userId } },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: 'name',
        as: 'categoryIcon'
      }
    },
    { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$categoryIcon', 0] }, '$$ROOT'] } } },
    { $project: { categoryIcon: 0 } },
    { $sort: { date: -1 } },
    { $addFields: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } } }
  ])

  // 總金額
  const amount = Record.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        amount: { $sum: '$amount' }
      }
    }
  ])

  // render month selector
  const months = Record.find({ userId })
    .sort({ date: -1 })
    .then(records => {
      const months = []
      records.forEach(record => {
        const displayDate = record.date.toISOString().substring(0, 7)

        if (months.includes(displayDate)) {
          return
        }
        months.push(displayDate)
      })
      return months
    })

  Promise.all([amount, record, months])
    .then(([amount, record, months]) => {
      if (record.length > 0) {
        const totalAmount = amount[0].amount
        res.render('index', { totalAmount, record, months })
      } else {
        const totalAmount = 0
        res.render('index', { totalAmount, record, months })
      }
    })
    .catch(error => {
      res.render('error')
      console.error(error)
    })
})

module.exports = router
