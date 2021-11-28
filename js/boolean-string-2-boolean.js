/**
 * ## 转换 boolean 字符串成 boolean 对象, 也就是 'true', 'false' 字符串转换成 true, false boolean字面量
 *
 * 一般会在转换 query string 上面用到
 *
 * @example
 * 链接: https://www.example.com/api/get?isNew=true&hasMoney=false
 *
 * ```js
 * const { isNew: isNewFromQuery, hasMoney: hasMoneyStringFromQuery } = this.ctx.query
 * const isNew = booleanString2Boolean(isNewFromQuery);
 * const hasMoney = booleanString2Boolean(hasMoneyStringFromQuery);
 * ```
 *
 * @desc
 * 1. 输入 'true', 输出 true
 * 2. 输入 'false', 输出 false
 * 3. 输入 null, 输出 false
 * 4. 输入 undefined, 输出 false
 * 5. 输入 其余值, 输出 false
 * @param {'true' | 'false' | null | undefined | any} booleanString 想要转换成 boolean 的值
 */

function booleanString2Boolean(booleanString) {
  if (booleanString === 'true') {
    return true;
  }

  if (booleanString === 'false') {
    return false;
  }

  return false;
}

export default booleanString2Boolean;
