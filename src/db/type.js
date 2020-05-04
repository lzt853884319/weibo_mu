/**
 * @deprecated 封装 sequelize 数据类型
 */

const Sequelize = require("sequelize");
module.exports = {
    STRING: Sequelize.STRING,
    DECIMAL: Sequelize.DECIMAL,
    TEXT: Sequelize.TEXT,
    BOOLEAN: Sequelize.BOOLEAN,
    INTERGER: Sequelize.INTEGER,
};