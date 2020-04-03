// 用户相关的请求路由判断
const router = require('koa-router')()
router.prefix("/user")

// 引入相关的controller
const UserController = require('../controllers/user-controller')

router.post('/login', UserController.login)

router.post('/register', UserController.register)

router.get('/logout', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
