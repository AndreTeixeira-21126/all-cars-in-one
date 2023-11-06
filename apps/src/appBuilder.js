const express = require('express')
const router = require('./routes/UserRouter')
const CreateAccountController = require('./controllers/CreateAccountController')

//const RegisterUserController = require('./controllers/RegisterUserController')
//const LoginController = require('./controllers/LoginController')
//const ValidateAuthController = require('./controllers/ValidateAuthController')

function makeApp (databaseInstance) {
  const app = express()
  app.use(express.json())
  app.set('createAccountController', new CreateAccountController(databaseInstance))
  app.set('editAccountController', new EditAccountController(databaseInstance, process.env.SECRET_JWT || 'secret'))
  app.set('deleteAccountController', new DeleteAccountController(databaseInstance, process.env.SECRET_JWT || 'secret'))
  app.use('/users', router)
  return app
}
module.exports = makeApp
