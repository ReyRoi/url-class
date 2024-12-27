const express =  require('express')
const {createShortId ,getHistory} = require('../controller/urlController')
const router = express.Router()



router.post('/',createShortId)
// router.get('/:shortid',handleRedirect)
router.get('/',getHistory)




module.exports = router