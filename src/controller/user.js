/**
 * @description use controller
 * @author lzt
 */

const {getUserInfo} = require("../services/user");
const {SuccessModel, ErrorModel} = require("../model/ResModel");
const {registerUserNameNotExistInfo} = require("../model/ErrInfo");
/**
 * @description 用户名是否存在
 * @param {String} userName 用户名
 */
const isExist = async (userName) => {
    // 业务逻辑处理 （无）
    // 调用 services
    const userInfo = await getUserInfo(userName);
    if(userInfo) {
        // 已存在
        return new SuccessModel(0, userInfo);
    } else {
        // 不存在
        return new ErrorModel(registerUserNameNotExistInfo);
    }
    // 返回统一格式
};
module.exports = {
    isExist
};