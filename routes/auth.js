const express = require('express')
const { register, login, editProfile } = require('../controller/auth')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/editProfile', editProfile)

module.exports = router