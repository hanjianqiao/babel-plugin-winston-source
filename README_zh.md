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

### Options

.babelrc

```javascript
{
    "plugins": [
        ["logger-source",{
			    logger: string[];//logger函数
				prefix: string;// 前缀
				resolveFileName: Function | 'acronyms' | 'fullpath';//文件信息的输出方式

		}]
    ]
}
```

#### logger

为指定的函数追加文件信息。  
默认:

```
logger:[
	'logger.log',
	'logger.info',
	'logger.wran',
	'logger.error',
	'logger.debug',
]
```

#### prefix

在文件信息前添加前缀。
如: `prefix:crm-client`。

```
logger.info('test');
↓ ↓ ↓ ↓ ↓ ↓
logger.info('crm-client [s.V/app.js (20:10)]', 'test')

```

#### resolveFileName

输出文件信息的方式。提供了`fullpath`和`acronyms` 方式，默认`acronyms`。

**acronyms**  
缩写

```
// src\\View/app.js

logger.info('test');
↓ ↓ ↓ ↓ ↓ ↓
logger.info('[s.V/app.js (20:10)]', 'test')
```

**fullpath**  
全路径

```
// src\\View/app.js

logger.info('test');
↓ ↓ ↓ ↓ ↓ ↓
logger.info('[s.V/app.js (20:10)]', 'test')
```

```
// src\\View/app.js

logger.info('test');
↓ ↓ ↓ ↓ ↓ ↓
logger.info('[src\\View\\app.js (2:10)]', 'test')
```

**自定义函数**  
函数定义:`((params: ResolveFileNameParams) => string)`  
自定义函数，传参如下:

```js
params: {
  filename: string; //文件路径
  projectPath: string; //项目根目录
  prefix: string; //前缀，在babelrc中设置的
  line: number; //行号
  column: number; //列号
}
```

如:

```
{
  plugins: [
    [
      'logger-source',
      {
        resolveFileName: function (params) {
          return params.filename;
        },
      },
    ],
  ],
};

```
