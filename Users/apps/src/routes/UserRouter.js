const router = require('express').Router()

router.post('/createAccount', async (req, res) => {
  const controller = req.app.get('createAccountController')
  controller.execute(req, res)
})

router.post('/editAccount', async (req, res) => {
  const controller = req.app.get('editAccountController')
  controller.execute(req, res)
})

router.get('/deleteAccount', async (req, res) => {
  const controller = req.app.get('deleteAccountController')
  controller.execute(req, res)
})

module.exports = router
