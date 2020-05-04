/**
 * @description 加密方法
 * @author lzt
 */

const crypto = require("crypto");
const {CRYPTO_SELECT_KEY} = require("../conf/secretKeys");

/**
 * @description md5 加密
 * @param content 明文
 */

function _md5(content) {
    const md5 = crypto.createHash("md5");
    return md5.update(content).digest("hex");
}

/**
 * @description 加密方法
 * @param {String} content 明文
 */
function doCrypto(content) {
    const str = `passwor${content}&key=${CRYPTO_SELECT_KEY}`;
    return _md5(str);
}
module.exports= {
    doCrypto
};