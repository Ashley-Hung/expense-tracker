const express = require('express')
const Record = require('../../models/record')

const router = express.Router()

router.get('/', (req, res) => {
  const record = Record.aggregate([
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

  // 總金額
  const amount = Record.aggregate([
    {
      $group: {
        _id: null, // 不能省略
        amount: { $sum: '$amount' }
      }
    }
  ])

  Promise.all([amount, record])
    .then(([amount, record]) => {
      const totalAmount = amount[0]
      res.render('index', { totalAmount, record })
    })
    .catch(error => console.error(error))
})

module.exports = router
