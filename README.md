# chan-async
A wrapper for [chan](https://www.npmjs.com/package/chan) to support promises.

## Installation
```bash
$ npm install chan-async
```

## Usage
First import chan-async
```js
const makeChan = require('chan-async');
```
Create a channel
```js
const ch = makeChan((val) => {
    return new Promise((resolve) => {
        console.log(`Read value: ${val}`);
        setTimeout(() => resolve(val * 2), 500);
    });
});
```
Write to the channel
```js
ch(42) // Returns a promise
    .then((res) => console.log(`Result: ${res}`))
    .catch((err) => console.error(err));
```
