const { Router } = require('express');
const { index } = require('./controller')
const { useGoogleSpreadsheet } = require('../../services/google-sheets')
const router = new Router()

router.get('/', useGoogleSpreadsheet, index)

module.exports = router;