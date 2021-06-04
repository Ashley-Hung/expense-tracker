const Record = require('../models/record')

module.exports = {
  getRecord: (userId, category, month, year) => {
    return Record.aggregate([
      {
        $project: {
          name: 1,
          category: 1,
          date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          month: { $month: '$date' },
          year: { $year: '$date' },
          amount: 1,
          userId: 1,
          merchant: 1
        }
      },
      { $match: { userId, month: month, year: year, category } },
      { $lookup: { from: 'categories', localField: 'category', foreignField: 'name', as: 'categoryIcon' } },
      { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$categoryIcon', 0] }, '$$ROOT'] } } },
      { $project: { categoryIcon: 0 } },
      { $sort: { date: -1 } }
    ])
  }, // NOTE: getAmount Done
  getAmount: (userId, category, month, year) => {
    return Record.aggregate([
      { $match: { userId, category } },
      {
        $project: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          month: { $month: '$date' },
          year: { $year: '$date' },
          amount: 1
        }
      },
      { $match: { month: month, year: year } },
      { $group: { _id: null, amount: { $sum: '$amount' } } }
    ])
  }
}
