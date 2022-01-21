const { Router } = require('express');
const { create, index, createTransfer } = require("./controller");
const { useGoogleSpreadsheet } = require('../../services/google-sheets')
const router = new Router()

router.post('/', useGoogleSpreadsheet, create)
router.post('/transfer', useGoogleSpreadsheet, createTransfer)
router.get("/", useGoogleSpreadsheet, index);


module.exports = router;