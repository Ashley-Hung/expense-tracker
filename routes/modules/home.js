const express = require('express')
const Record = require('../../models/record')
const filterMonth = require('../../controllers/filterMonth')

const router = express.Router()

router.get('/', async (req, res) => {
  const record = await Record.aggregate([
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
  const totalAmount = record.map(record => record.amount).reduce((acc, cur) => acc + cur)

  // render month selector
  const months = await filterMonth.getRenderMonths // render month selector

  Promise.all([totalAmount, record, months])
    .then(([totalAmount, record, months]) => {
      res.render('index', { totalAmount, record, months })
    })
    .catch(error => console.error('data error'))
})

module.exports = router
