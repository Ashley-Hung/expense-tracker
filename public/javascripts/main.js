/* Submit form */
function submitForm(event) {
	const form = document.querySelector('#submit-form')
	if (!form.checkValidity()) {
		event.preventDefault()
		event.stopPropagation()
	}
}

/* Click submit button */
function clickSubmit() {
	const form = document.querySelector('#submit-form')
	form.classList.add('was-validated')
}

/* Delete alert */
function deleteAlert() {
	return confirm('Are you sure you want to delete this record?')
}

/* get current date */
const today = dayjs().format('YYYY-MM-DD')
document.getElementById('date').setAttribute('max', today)
