module.exports = (date, amount) => {
  const Ajv = require('ajv').default
  const addFormats = require('ajv-formats')
  const ajv = new Ajv({ allErrors: true }) // 顯示超過一個以上的 errors
  addFormats(ajv)
  require('ajv-errors')(ajv)

  let today = new Date()
  today.setTime(today.getTime() + 24 * 60 * 60 * 1000)[0]
  const tomorrow = today.toISOString().slice(0, 10)
  today = new Date().toISOString().slice(0, 10)

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
