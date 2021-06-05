module.exports = (date, amount) => {
  const Ajv = require('ajv').default
  const addFormats = require('ajv-formats')
  const ajv = new Ajv({ allErrors: true }) // 顯示超過一個以上的 errors
  addFormats(ajv)
  require('ajv-errors')(ajv)

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

  const schema = {
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

  amount = Number(amount)
  console.log(typeof amount)
  const validate = ajv.compile(schema)
  validate({ date, amount })
  // console.log(validate.errors)

  return validate.errors // [{message:}, {message:}, {message:}]
}
