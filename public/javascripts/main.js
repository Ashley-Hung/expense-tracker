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
let today = new Date()
let dd = today.getDate()
let mm = today.getMonth() + 1 //January is 0!
let yyyy = today.getFullYear()

if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}
today = yyyy + '-' + mm + '-' + dd
document.getElementById('date').setAttribute('max', today)
