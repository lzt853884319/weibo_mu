/**
 * @description 环境变量
 * @author drdp
*/
const ENV = process.env.NODE_ENV;

module.exports = {
    isDev: ENV === "development",
    notDev: ENV !== "development",
    isProd: ENV === "production",
    notProd: ENV !== "production",
    isTest: ENV === "test",
    notTest: ENV !== "test",

};