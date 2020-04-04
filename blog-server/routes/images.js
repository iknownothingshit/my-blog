// 图片上传路由

const router = require('koa-router')()
const koaBody = require('koa-body')({
    multipart: true,  // 允许上传多个文件
    formidable: {
        uploadDir: 'public/images',// 上传的文件存储的路径 
        keepExtensions: false  //  保存图片的扩展名
    }
})
router.prefix("/image")

const ImageController = require('../controllers/images-controller')

router.post('/uploadImg', ImageController.uploadImg)

module.exports = router