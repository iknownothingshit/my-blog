const router = require('koa-router')();
router.prefix("/praise");

// 文章相关的请求路由判断

const PraiseController = require('../controllers/praise-controller');

module.exports = router;
