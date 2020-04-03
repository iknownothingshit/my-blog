// 用户表模型
const dataBase = require('../config/db')

let sequelize = dataBase.sequelize,
    Sequelize = dataBase.Sequelize

const UserModel = sequelize.define('user', {
    userId: {
        type: Sequelize.INTEGER(4),
        primaryKey: true
    },
    account: Sequelize.STRING(16),
    password: Sequelize.STRING(10),
    name: Sequelize.STRING(255),
    userAvatars: Sequelize.STRING(255)
})

class User {
    // 用户登录方法：查询用户名以及验证密码是否正确
    static async userLogin(account, password) {
        let obj = {}
        const res = await UserModel.findOne({ where: { account: account } })
        obj.data = res
        if (res && res.password === password) {
            obj.message = '登陆成功'
            obj.code = 1
        } else if (res) {
            obj.message = '密码不正确'
            obj.code = 0
        } else {
            obj.message = '用户名不存在'
            obj.code = 0
        }
        return obj
    }

    // 用户注册:用户名不重复则注册进数据库
    static async userRegister(account, password) {
        let obj = {}
        const isAccount = await UserModel.findOne({ where: { account: account } })
        if (isAccount) {
            obj.code = 0
            obj.message = '用户名已存在'
        } else {
            await UserModel.create({
                account: account,
                password: password
            })
            const result = await UserModel.findOne({ where: { account: account } })
            obj.data = result
            obj.code = 1
            obj.message = '注册成功'
        }
        return obj
    }
}

module.exports = User