const router = require('express').Router()

router.post('/register', async (req, res) => {
  const controller = req.app.get('registerUserController')
  controller.execute(req, res)
})

router.post('/login', async (req, res) => {
  const controller = req.app.get('loginController')
  controller.execute(req, res)
})

router.get('/validate', async (req, res) => {
  const controller = req.app.get('validateAuthController')
  controller.execute(req, res)
})

module.exports = router
