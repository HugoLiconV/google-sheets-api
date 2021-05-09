const { Router } = require('express')
const accounts = require('./accounts')
const dashboard = require('./dashboard')

const router = new Router()

router.use('/accounts', accounts)
router.use('/dashboard', dashboard)
router.get('/', (_, res) => {
  return res.json({ version: '1.0.0' })
})

module.exports = router;