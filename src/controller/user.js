/**
 * @description use controller
 * @author lzt
 */

const {getUserInfo, createUser} = require("../services/user");
const {SuccessModel, ErrorModel} = require("../model/ResModel");
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo
} = require("../model/ErrInfo");

const {doCrypto} = require("../utils/crypto");
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
        return new SuccessModel(userInfo);
    } else {
        // 不存在
        const result = new ErrorModel(registerUserNameNotExistInfo);
        return result;
    }
    // 返回统一格式
};
/**
 * @description 注册接口
 * @param {String} userName 
 * @param {String} password 
 * @param {number} gender 1 male 2 female 3orther
 */
const register = async ({userName, password, gender}) => {
    const userInfo = await getUserInfo(userName);
    if(userInfo) {
        return new ErrorModel(registerUserNameExistInfo);
    }
    try {
        const userInfo = await createUser({
            userName,
            password: doCrypto(password),
            gender
        });
        return new SuccessModel(userInfo);
    } catch(e) {
        console.error(e.message, e.stack);
        return new ErrorModel(registerFailInfo);
    }
};
/**
 * 
 * @param {Object} ctx  koa2 ctx
 * @param {String} userName  用户名
 * @param {String} password  密码
 */
const login = async (ctx, userName, password) => {
    // 登陆成功 ctx.session.userInfo = xxx;

    const userInfo = await getUserInfo(userName, doCrypto(password));
    if(!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo);
    } else {
        // 登录成功
        if(ctx.session.userInfo == null) {
            ctx.session.userInfo = userInfo;
        }
        return new SuccessModel();
    }
};
module.exports = {
    isExist,
    register,
    login
};