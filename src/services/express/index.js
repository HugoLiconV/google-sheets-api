const express = require('express')
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const { env, origin } = require('../../config')

module.exports = (apiRoot, routes) => {
  const app = express();
  const corsOptions = {
    origin: env === 'production' ? origin : 'http://localhost:3000'
  }
  if (env === 'production' || env === 'development') {
    app.use(cors(corsOptions))
    app.use(compression())
    app.use(morgan('dev'))
  }

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(apiRoot, routes)

  return app

}