let today = new Date()
let dd = today.getDate()
let mm = today.getMonth() + 1
let yyyy = today.getFullYear()

dd_today = dd
dd += 1
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}
if (dd_today < 10) {
  dd_today = '0' + dd_today
}

today = yyyy + '-' + mm + '-' + dd_today
tomorrow = yyyy + '-' + mm + '-' + dd
// console.log(today)
// console.log(tomorrow)

module.exports = {
  schema: {
    type: 'object',
    allOf: [
      {
        properties: {
          amount: { type: 'integer', minimum: 1 },
          date: {
            type: 'string',
            format: 'date',
            formatExclusiveMaximum: tomorrow
          }
        },
        additionalProperties: false
      }
    ],
    errorMessage: {
      properties: {
        amount: '金額不能小於 0。',
        date: `日期不能大於 ${today}`
      }
    }
  }
}
