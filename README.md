# snippets

分类存储自己的代码片段

## JavaScript

### [Polling](./js/polling.js)

轮询一个异步操作

```js
new Polling()
```

### [booleanString2Boolean](./js/boolean-string-2-boolean)

转换 boolean 字符串成 boolean 对象, 也就是 'true', 'false' 字符串转换成 true, false boolean 字面量

```js
booleanString2Boolean('true')
// return true
booleanString2Boolean('false')
// return false
booleanString2Boolean(null)
// return false
booleanString2Boolean(undefined)
// return false
booleanString2Boolean('rewrwr')
// return false
```
