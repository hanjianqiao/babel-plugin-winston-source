# babel-plugin-logger-source

将源文件信息设置为 logger 函数的第一个参数。

```javascript
// src/view/app.js
class App() {
    constructor() {
        logger.log('test')//line no 20,column no 10
    }
}
↓ ↓ ↓ ↓ ↓ ↓
class App() {
    constructor() {
        logger.log('[s.V/app.js (20:10)]', 'test')
    }
}

```

### Usage

```bash
$ yarn add babel-plugin-logger-source -D
```

.babelrc

```javascript
{
    "plugins": [
        ["logger-source"]
    ]
}
```
