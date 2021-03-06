const Record = require('../models/record')

module.exports = {
  getRecord: (userId, month, year) => {
    return Record.aggregate([
      { $match: { userId } },
      {
        $project: {
          name: 1,
          category: 1,
          date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          month: { $month: '$date' },
          year: { $year: '$date' },
          amount: 1,
          merchant: 1
        }
      },
      { $match: { month, year } },
      { $lookup: { from: 'categories', localField: 'category', foreignField: 'name', as: 'categoryIcon' } },
      { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$categoryIcon', 0] }, '$$ROOT'] } } },
      { $project: { categoryIcon: 0 } },
      { $sort: { date: -1 } }
    ])
  },
  getAmount: (userId, month, year) => {
    return Record.aggregate([
      { $match: { userId } },
      {
        $project: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          month: { $month: '$date' },
          year: { $year: '$date' },
          amount: 1
        }
      },
      { $match: { month, year } },
      { $group: { _id: null, amount: { $sum: '$amount' } } }
    ])
  }
}
