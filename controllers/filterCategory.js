const Record = require('../models/record')

module.exports = {
  getRecord: (userId, category) => {
    return Record.aggregate([
      { $match: { userId, category } },
      { $lookup: { from: 'categories', localField: 'category', foreignField: 'name', as: 'categoryIcon' } },
      { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$categoryIcon', 0] }, '$$ROOT'] } } },
      { $project: { categoryIcon: 0 } },
      { $sort: { date: -1 } },
      { $addFields: { date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } } }
    ])
  },
  getAmount: (userId, category) => {
    return Record.aggregate([{ $match: { userId, category } }, { $group: { _id: null, amount: { $sum: '$amount' } } }])
  }
}
