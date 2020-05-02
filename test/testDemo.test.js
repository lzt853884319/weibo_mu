/**
 * @description 测试用例
 * @author drdp
 */

function multiply(a, b) {
    return a * b;
}

test("乘法 100 * 100 === 10000", () => {
    expect(multiply(100, 100)).toBe(10000);
    expect(multiply(100, 100)).not.toBe(100100);
});