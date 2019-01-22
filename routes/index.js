const router = require('koa-router')()
const Index = require('../controllers/index')
router.get('/', Index.homePage)

module.exports = router
