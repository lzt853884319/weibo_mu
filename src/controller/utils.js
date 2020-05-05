/**
 * @description utils controller
 * @author lzt
 */
const path = require("path");
const {uploadFileSizeFailInfo} = require("../model/ErrInfo");
const {ErrorModel, SuccessModel} = require("../model/ResModel");
const fse = require("fs-extra");

//  文件最大提及为1M
const MIX_SIZE = 1024 * 1024 * 1024;
const DIST_FOLDER_PATH = path.join(__dirname, "../", "../", "uploadFiles");

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if(!exist) {
        fse.ensureDir(DIST_FOLDER_PATH);
    }
});

/**
 * 
 * @param {String} name  文件名
 * @param {String} type 文件类型 
 * @param {String} name 文件提体积大小
 * @param {String} filePath 文件路径
 */
async function saveFile({name, _type, size, filePath}) {
    if(size > MIX_SIZE) {
        // 删除掉文件
        fse.remove(filePath);
        return new ErrorModel(uploadFileSizeFailInfo);
    }

    // 移动文件
    const fileName = `${Date.now()}_${name}`;
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName); // 目标文件夹
    await fse.move(filePath, distFilePath);

    // 返回信息
    return new SuccessModel({
        url: "/" + fileName
    });

}
module.exports = {
    saveFile
};