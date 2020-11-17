const router = require('koa-router')();
router.prefix("/artical");

// 文章相关的请求路由判断

const ArticalController = require('../controllers/artical-controller');

router.post('/uploadBlog', ArticalController.blogUpload);

router.post('/fetchArticals', ArticalController.fetchArticals);

router.post('/fetchUserArticals', ArticalController.fetchUserArticals);

router.post('/praise', ArticalController.praise);

module.exports = router;
