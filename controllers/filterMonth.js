const Record = require('../models/record')

module.exports = {
  getRenderMonths: Record.find()
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
    }),
  getRecord: (month, year) => {
    return Record.aggregate([
      {
        $project: {
          name: 1,
          category: 1,
          date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          month: { $month: '$date' },
          year: { $year: '$date' },
          amount: 1
        }
      },
      { $match: { month: month, year: year } },
      { $lookup: { from: 'categories', localField: 'category', foreignField: 'name', as: 'categoryIcon' } },
      { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$categoryIcon', 0] }, '$$ROOT'] } } },
      { $project: { categoryIcon: 0 } },
      { $sort: { date: -1 } }
    ])
  }
}
