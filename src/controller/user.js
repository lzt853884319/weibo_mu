/**
 * @description use controller
 * @author lzt
 */

const {getUserInfo, createUser, deleteUser, updateUser} = require("../services/user");
const {SuccessModel, ErrorModel} = require("../model/ResModel");
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo
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

const deleteCurUser = async (userName) => {
    // service 
    const result = await deleteUser(userName);
    if(result) {
        // 成功 
        return new SuccessModel();
    }
    return new ErrorModel(deleteUserFailInfo);
};

/**
 * 修改个人信息
 * @param {Object} ctx 
 * @param {string} nickName 
 * @param {string} city 
 * @param {string} picture 
 */
async function changeInfo(ctx, {nickName, city, picture}) {
    const {userName} = ctx.session.userInfo;
    if(!nickName) {
        nickName = userName;
    }
    // service
    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture
        },
        {userName}
    );
    if(result) {
        // 执行成功
        ctx.session.userInfo = Object.assign(ctx.session.userInfo, {nickName, city, picture});
        return new SuccessModel();
    } else {
        ctx.body = new ErrorModel(changeInfoFailInfo);
    }
}
/**
 * 
 * @param {string} userName 
 * @param {string} password 
 * @param {string} newPassword 
 */
async function changePassword(userName, password, newPassword) {
    const result = await updateUser(
        {newPassword: doCrypto(newPassword)},
        {
            userName,
            password: doCrypto(password)
        }
    );
    if(result) {
        return new SuccessModel();
    } else {
        return new ErrorModel(changePasswordFailInfo);
    }
}
/**
 * 退出登录
 * @param {ctx} ctx 
 */
async function logout(ctx) {
    delete ctx.session.userInfo;
    return new SuccessModel();
}
module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
};