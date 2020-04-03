const jwt = require('jsonwebtoken')
const secret = 'token' // 密钥

module.exports = {
    createToken: (user) => {
        // 创建token
        const token = jwt.sign({
            user: user.account,
            id: user.id
        }, secret, { expiresIn: '1h' })
        return token
    },

    checkToken: (token) => {
        let toke = token.split(' ')[1]
        // 解析token
        let decode = jwt.decode(token, secret)
        return decode
    }
}