# Babel-plugin-logger-source

Prepends file name and line numbers for each logger command, based on the source files.

```javascript
// app.js
class App() {
    constructor() {
        logger.log('test')
    }
}
↓ ↓ ↓ ↓ ↓ ↓
class App() {
    constructor() {
        logger.log('app.js (3:8)', 'test')
    }
}

// test.js
class Test() {
    constructor() {
        logger.log('test two')
    }
}
↓ ↓ ↓ ↓ ↓ ↓
class Test() {
    constructor() {
        logger.log('test.js (3:8)', 'test two')
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
