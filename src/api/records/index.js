const { Router } = require('express');
const { create, index } = require('./controller')
const { useGoogleSpreadsheet } = require('../../services/google-sheets')
const router = new Router()

router.post('/', useGoogleSpreadsheet, create)
router.get("/", useGoogleSpreadsheet, index);


module.exports = router;