/**
 * @description sync同步 sequelize
 */
// const Sequelize = require("sequelize");
const seq = require("./seq");

// const {User} = require("./model/index"); 
 
seq.authenticate().then(() => {
    console.log("auth ok");
}).catch(_e => {
    console.log("auth err");
});
seq.sync({force: false}).then(() => {
    console.log("sync ok");
    process.exit();
});