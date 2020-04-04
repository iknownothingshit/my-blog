// 图片相关的操作类

const formidable = require('koa-formidable'); // 图片处理
const fs = require('fs'); // 图片路径

class Image {
    // 上传图片
    static async uploadImg(ctx) {
        let form = formidable.parse(ctx.request)
        let p = new Promise((resolve, reject) => {
            form((opt, { fields, files }) => {
                let name = Date.now() + '.png'
                // 查看是否已有相同图片，有则直接返回，没有则存进文件夹里
                let imgs = fs.readdirSync('public/images')
                let newImg = fs.readFileSync(files.file.path, function (err) { })
                for (let img of imgs) {
                    let oldImg = fs.readFileSync('public/images/' + img, function (err) { })
                    if (oldImg.toString() === newImg.toString()) {
                        resolve(img)
                        return
                    }
                }
                fs.renameSync(files.file.path, 'public/images/' + name)
                resolve(name)
            })
        })

        await p.then(res => {
            ctx.response.body = { data: res, code: 1 }
            ctx.response.status = 200
        }).catch(err => {
            ctx.response.body = { data: err, code: 0 }
            ctx.response.status = 200
        })
    }
}

module.exports = Image