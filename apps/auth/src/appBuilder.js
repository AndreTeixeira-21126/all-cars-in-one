const express = require('express')
const router = require('./routes/UserRouter')
const RegisterUserController = require('./controllers/RegisterUserController')

function makeApp (userRepository) {
  const app = express()
  app.use(express.json())
  app.set('registerUserController', new RegisterUserController(userRepository))
  app.use('/users', router)
  return app
}
module.exports = makeApp
