/**
 * @description json schema 校验
 * @autor lzt
 */
const AJV = require("ajv");
const ajv = new AJV();

/**
 * 
 * @param {Object} schema 
 * @param {Object} data 
 */
function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data);
    if(!valid) {
        return ajv.errors[0];
    } else {
        return;
    }
}
module.exports = {
    validate
};