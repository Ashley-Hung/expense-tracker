const filterCategory = require('./filterCategory')
const filterMonth = require('./filterMonth')
const filterBoth = require('./filterBoth')
const Record = require('../models/record')

module.exports = {
  getFilterExpense: async (req, res) => {
    const { category } = req.query
    const selectedMonth = req.query.month
    const userId = req.user._id
    let year = 0
    let month = 0

    if (selectedMonth) {
      year = Number(selectedMonth.slice(0, 4))
      month = Number(selectedMonth.slice(5, 7))
    }

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

    if (selectedMonth && category) {
      const record = filterBoth.getRecord(userId, category, month, year)
      const amount = filterBoth.getAmount(userId, category, month, year)

      Promise.all([record, amount, selectedMonth, category, months])
        .then(([record, amount, selectedMonth, category, months]) => {
          if (record.length > 0) {
            const totalAmount = amount[0].amount
            res.render('index', { record, totalAmount, selectedMonth, category, months })
          } else {
            const totalAmount = 0
            res.render('index', { record, totalAmount, selectedMonth, category, months })
          }
        })
        .catch(error => console.error('something went wrong'))
    } else if (category && !selectedMonth) {
      const record = filterCategory.getRecord(userId, category)
      const amount = filterCategory.getAmount(userId, category)

      Promise.all([record, amount, category, months])
        .then(([record, amount, category, months]) => {
          if (record.length > 0) {
            const totalAmount = amount[0].amount
            res.render('index', { record, totalAmount, category, months })
          } else {
            const totalAmount = 0
            res.render('index', { record, totalAmount, category, months })
          }
        })
        .catch(error => console.error('something went wrong'))
    } else if (selectedMonth && !category) {
      const record = filterMonth.getRecord(userId, month, year)
      const amount = filterMonth.getAmount(userId, month, year)

      Promise.all([record, amount, months, selectedMonth])
        .then(([record, amount, months, selectedMonth]) => {
          if (record.length > 0) {
            const totalAmount = amount[0].amount
            res.render('index', { record, totalAmount, months, selectedMonth })
          } else {
            const totalAmount = 0
            res.render('index', { record, totalAmount, months, selectedMonth })
          }
        })
        .catch(error => console.error('something went wrong'))
    }
  }
}

// module.exports = {
//   getFilterExpense: async (req, res) => {
//     try {
//       const { category } = req.query
//       const selectedMonth = req.query.month
//       const months = await filterMonth.getRenderMonths // render month selector

//       if (!selectedMonth) {
//         // filter by category
//         const record = await filterCategory.getRecord(category)
//         const totalAmount = record.map(record => record.amount).reduce((acc, cur) => acc + cur)
//         res.render('index', { totalAmount, record, category, months, selectedMonth })
//       } else {
//         const year = Number(selectedMonth.slice(0, 4))
//         const month = Number(selectedMonth.slice(5, 7))
//         const record = await filterMonth.getRecord(month, year) // record: filter by month
//         const totalAmount = record.map(record => record.amount).reduce((acc, cur) => acc + cur)

//         res.render('index', { record, totalAmount, months, selectedMonth })
//       }
//     } catch (err) {
//       res.redirect('/')
//       console.warn('篩選器出現錯誤')
//     }
//   }
// }
