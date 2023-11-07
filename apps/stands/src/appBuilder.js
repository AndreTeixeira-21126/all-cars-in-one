const express = require('express')
const router = require('./routes/StandRouter')
const RegisterStandController = require('./controllers/registerStandController')

function makeApp (standRepository) {
  const app = express()
  app.use(express.json())
  app.set('registerStandController', new RegisterStandController(standRepository))
  app.use('/stands', router)
  return app
}
module.exports = makeApp
