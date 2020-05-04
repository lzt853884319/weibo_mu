/**
 * @description user services
 * @author lzt
 */

const {User} = require("../db/model/index");
const {formatUser} = require("./_format");

/**
 * @description 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
const getUserInfo = async (userName, password) => {
    // 查询条件
    const whereOpt = {
        userName
    };
    password && (whereOpt.password = password);

    // 查询操作
    const result = await User.findOne({
        attributes: ["id", "userName", "nickName", "picture", "city"],
        where: whereOpt,

    });
    if(result == null) {
        // 未找到
        return result;
    } else {
        return formatUser(result.dataValues);
    }
};

module.exports = {
    getUserInfo
};