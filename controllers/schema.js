const dayjs = require('dayjs')

const today = dayjs().format('YYYY-MM-DD')
const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD')

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
