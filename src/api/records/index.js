const { Router } = require('express');
const { create, index, createTransfer, autoComplete } = require("./controller");
const { useGoogleSpreadsheet } = require('../../services/google-sheets')
const router = new Router()

router.post('/', useGoogleSpreadsheet, create)
router.post('/transfers', useGoogleSpreadsheet, createTransfer)
router.get("/", useGoogleSpreadsheet, index);
router.get("/autocomplete", useGoogleSpreadsheet, autoComplete);


module.exports = router;