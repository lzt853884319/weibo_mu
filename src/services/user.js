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

/**
 * @description 创建用户
 * @param {String} userName 
 * @param {String} password 
 * @param {number} gender 1 male 2 female 3orther
 * @param {Sting} nickName 昵称
 */
const createUser = async ({userName, password, gender = 3, nickName}) => {
    const result = await User.create({
        userName,
        password,
        nickName: nickName || userName,
        gender
    });
    return result.dataValues;
};

const deleteUser = async (userName)=> {
    const result = await User.destroy({
        where: {
            userName
        }
    });
    // result 删除的行数
    return result > 0;
};

module.exports = {
    getUserInfo,
    createUser,
    deleteUser
};