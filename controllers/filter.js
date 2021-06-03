const filterCategory = require('./filterCategory')
const filterMonth = require('./filterMonth')

module.exports = {
  getFilterExpense: async (req, res) => {
    try {
      const { category } = req.query
      const selectedMonth = req.query.month
      const months = await filterMonth.getRenderMonths // render month selector

      if (!selectedMonth) {
        // filter by category
        const record = await filterCategory.getRecord(category)
        const totalAmount = record.map(record => record.amount).reduce((acc, cur) => acc + cur)
        res.render('index', { totalAmount, record, category, months, selectedMonth })
      } else {
        const year = Number(selectedMonth.slice(0, 4))
        const month = Number(selectedMonth.slice(5, 7))
        const record = await filterMonth.getRecord(month, year) // record: filter by month
        const totalAmount = record.map(record => record.amount).reduce((acc, cur) => acc + cur)

        res.render('index', { record, totalAmount, months, selectedMonth })
      }
    } catch (err) {
      res.redirect('/')
      console.warn('篩選器出現錯誤')
    }
  }
}
