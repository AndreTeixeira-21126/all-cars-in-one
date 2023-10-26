const router = require('express').Router()

router.post('/register', async (req, res) => {
  const controller = req.app.get('registerUserController')
  controller.execute(req, res)
})

module.exports = router