/**
 * @description  json schema 中间件
 * @author lzt
 */

const {ErrorModel} = require("../model/ResModel");
const {jsonSchemaFileInfo} = require("../model/ErrInfo");

/**
  * 
  * @param {function} validateFn  验证函数
  */
function generateValidator(validateFn) {
    async function validator(ctx, next) {
        // 校验
        const data = ctx.request.body;
        const error = validateFn(data);
        if(error) {
            // 验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo);
            return;
        }
        await next();
    }
    return validator;
}
module.exports = {
    generateValidator
};