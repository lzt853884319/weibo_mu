/** 
* @description 存储配置
* 
*/ 

const Sequelize = require('sequelize');
const {MYSQL_CONF} = require("../conf/db");
const {isProd, isTest} = require("../utils/env");


const {host, user, password, database} = MYSQL_CONF;
const config = {
    host: 'localhost',
    dialect: 'mysql'  
};
 
if(isTest) {
    config.logging = () => {}
}
// 线上环境
if(isProd) {
    config.pool = {
        max: 5,
        min: 0,
        idle: 10000, // 如果一个连接池 10 s没有使用则释放 
    }
}
const seq = new Sequelize(database, user, password, config);

module.exports = seq;
