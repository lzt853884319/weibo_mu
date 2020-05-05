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

/**
 * 
 * @param {Objcet} newParams 新信息
 * @param {Object} oldParamas 原信息 
 */
async function updateUser (
    {newPassWord, newNickName, newCity, newPicture},
    {userName, password}
) {
    // 拼接修改内容
    const updateData = {};
    if(newPassWord) {
        updateData.password = newPassWord;
    }
    if(newNickName) {
        updateData.nickName = newNickName;
    }
    if(newCity) {
        updateData.city = newCity;
    }
    if(newPicture) {
        updateData.picture = newPicture;
    }
    // 拼接查询条件
    const whereData = {
        userName
    };
    if(password) {
        whereData.password = password;
    }
    // 执行修改
    const result = await User.update(updateData, {
        where: whereData
    });
    return result[0] > 0; // 修改的行数
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
};