/**
 * @description 数据格式化
 * @author lzt
 */
const {DEFAULT_USERINFO_PICTURE} = require("../conf/constants");

const _formatUserPicture = (obj) => {
    if(obj.picture == null) {
        obj.picture = DEFAULT_USERINFO_PICTURE;
    }
    return obj;
};

/**
 * 
 * @param {Array|Object} list 用户列表或单个对象
 * 
 */
const formatUser = (list) => {
    if(!list) return list;

    if(Array.isArray(list)) {
        return list.map(_formatUserPicture);
    } else if(Object.prototype.toString.call(list) === "[object Object]") {
        return _formatUserPicture(list);
    }
};

module.exports = {
    formatUser
};