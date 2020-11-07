// 用户相关的请求路由判断
const router = require('koa-router')()
router.prefix("/user")

// 引入相关的controller
const UserController = require('../controllers/user-controller')

router.post('/login', UserController.login)

router.post('/register', UserController.register)

router.post('/uploadMsg', UserController.uploadMsg)

router.post('/getUser', UserController.getUser)

module.exports = router
