# babel-plugin-winston-source

> Docs are not completed

Winston: Prepends file name and line numbers for each logger command, based on the source files.
> Note: you need to use: `logger.info(...args) to make it work`

### .bablerc
```js
{
  "plugins": [
    "babel-plugin-winston-source"
  ]
}
```

### your code
> winston log take two args: (message, meta), so zip messages into an array
```js
// src/view/app.js
class App() {
  constructor() {
    logger.log('test', 'foo', 'bar')//line no 20,column no 10
  }
}
```
```
↓ ↓ ↓ ↓ ↓ ↓
```
```js
class App() {
  constructor() {
    logger.log(['test', 'foo', 'bar'], {position: '[s.V/app.js (20:10)]'})
  }
}
```
