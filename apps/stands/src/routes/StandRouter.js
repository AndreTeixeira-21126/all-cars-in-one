const router = require('express').Router()

router.post('/stand', async (req, res) => {
  const controller = req.app.get('registerStandController')
  controller.execute(req, res)
})

module.exports = router
