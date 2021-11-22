/**
 * ## 转换 boolean 字符串成 boolean 对象, 也就是 'true', 'false' 字符串转换成 true, false boolean字面量
 *
 * @example
 * 1. 输入 'true', 输出 true
 * 2. 输入 'false', 输出 false
 * 3. 输入 null, 输出 false
 * 4. 输入 undefined, 输出 false
 * 5. 输入 其余值, 输出 false
 * @param {'true' | 'false' | null | undefined} booleanString 想要转换成 boolean 的值
 */

function booleanString2Boolean(booleanString) {
  if (booleanString === null || booleanString === undefined) {
    return false;
  }

  if (booleanString === 'true') {
    return true;
  }

  if (booleanString === 'false') {
    return false;
  }

  return false;
}

export default booleanString2Boolean;
