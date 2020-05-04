/**
 * @description user model test
 * @author lzt;
 */

const User = require("../../src/db/model/User");

test("User 模型的各个属性，符合预期", () => {
    // build 会构建一个内存的user实例 但不会提交到数据库
    const user = User.build({
        userName: "zhangsan",
        password: "p123123",
        nickName: "张三",
        picture: "/xxx.png",
        city: "北京"
    });
    // 验证各个属性
    expect(user.userName).toBe("zhangsan");
    expect(user.password).toBe("p123123");
    expect(user.picture).toBe("/xxx.png");
    expect(user.gender).toBe(3);
});