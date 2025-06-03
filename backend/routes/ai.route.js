const {textInputController} = require('../controllers/textInput.controller')
const {linkInputController} = require('../controllers/linkInput.controller')
const express = require('express')
const router = express.Router()

router.post('/text-response', textInputController)
router.post('/link-response', linkInputController)

module.exports = router