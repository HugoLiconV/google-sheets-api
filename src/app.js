const { env, port, ip, apiRoot, } = require('./config')
const express = require('./services/express')
const api = require('./api')
require('./services/redis')

const app = express(apiRoot, api)

app.listen(port, () => {
  console.log(`🚀 App listening on http://%s:%d, in %s mode`, ip, port, env)
})