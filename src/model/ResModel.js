/**
 * @description res的数据和模型
 * @autore lzt
 */

/**
  * 基础模块
  */

class BaseModel {
    constructor({errno, data, message}) {
        this.errno = errno;
        data && (this.data = data);
        message && (this.message = message);
    }
}

class SuccessModel extends BaseModel {
    constructor(data = {}) {
        super({
            errno: 0,
            data
        });
    }
}

class ErrorModel extends BaseModel {
    constructor({errno, message}) {
        super({
            errno,
            message
        });
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
};