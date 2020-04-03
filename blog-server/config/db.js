// 数据库连接的配置
const Sequelize = require('sequelize')


const sequelize = new Sequelize('blogger-system', 'root', '130358', {
    host: "127.0.0.1",
    dialect: 'mysql', // 数据库类型
    define: {
        timestamps: false
    },
    pool: { // 连接池配置
        max: 5, // 最大连接数
        min: 0,  // 最小连接数
        acquire: 30000, // 请求超时时间
        idle: 10000, // 断开连接后，连接实例在连接池保持的时间
    },
    logging: true
})

// 测试连接是否成功
sequelize
    .authenticate()
    .then(() => {
        console.log('数据库连接成功.')
    })
    .catch(err => {
        console.log('连接失败：', err)
    })




module.exports = { sequelize, Sequelize }