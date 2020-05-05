/**
 * @description utils api 路由
 * @author lzt
 */

const router = require("koa-router")();
const {loginCheck} = require("../../middleware/loginCheck");
const koaForm = require("koa2-formidable");
const {saveFile} = require("../../controller/utils");

router.prefix("/api/utils");

// 上传图片
router.post("/upload", loginCheck, koaForm(), async (ctx, _next) => {
    const file = ctx.request.files["file"];
    const { size, path, name, type } = file;
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path
    });
});
module.exports = router;