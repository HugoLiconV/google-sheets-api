const { Router } = require('express');
const { create } = require('./controller')
const { useGoogleSpreadsheet } = require('../../services/google-sheets')
const router = new Router()

router.post('/', useGoogleSpreadsheet, create)

module.exports = router;