/**
 * @description test json api
 */
const server = require("./server");

test("json api", async () => {
    const res = await server.get("/json");
    console.log(res);
    expect(res.body).toEqual({
        title: "koa2 json"
    });
});