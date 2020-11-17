const router = require('koa-router')();
router.prefix("/comment");

// 评论相关的请求路由判断

const CommentController = require('../controllers/comment-controller');

router.post('/comment', CommentController.comment);

router.post('/fetchComments', CommentController.fetchComments);

module.exports = router;
