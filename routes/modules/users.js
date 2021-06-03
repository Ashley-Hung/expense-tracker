const express = require('express')
const User = require('../../models/user')
const passport = require('passport')
const router = express.Router()

// login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

//register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) errors.push({ message: '所有欄位皆為必填' })
  if (password !== confirmPassword) errors.push({ message: '密碼與確認密碼不相符！' })
  if (errors.length) {
    return res.render('register', { errors, name, email, password })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => {
          res.end('Something went wrong')
          console.log(err)
        })
    }
  })
})

// logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router
