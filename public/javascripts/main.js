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

const today = new Date().toISOString().slice(0, 10)
document.getElementById('date').max = today
