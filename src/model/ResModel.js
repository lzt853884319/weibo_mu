/**
 * @description res的数据和模型
 * @autore lzt
 */

/**
  * 基础模块
  */

class BaseModel {
    constructor({errno, data, msg}) {
        this.errno = errno;
        data && (this.data = data);
        msg && (this.msg = msg);
    }
}

class SuccessModel extends BaseModel {
    constructor(errno, data = {}) {
        super({
            errno,
            data
        });
    }
}

class ErrorModel extends BaseModel {
    constructor(errno, msg) {
        super({
            errno,
            msg
        });
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
};