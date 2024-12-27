const express = require('express')
const { registerNewUser, loginUser, logoutUser } = require('../controller/userController')
const router = express.Router()



router.post('/signup',registerNewUser)

router.post('/login',loginUser)


router.delete('/logout',logoutUser)


module.exports = router