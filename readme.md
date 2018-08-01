Tasks generator for notification
================================

[![build status](https://img.shields.io/travis/runner/generator-notify.svg?style=flat-square)](https://travis-ci.org/runner/generator-notify)
[![npm version](https://img.shields.io/npm/v/@runner/generator-notify.svg?style=flat-square)](https://www.npmjs.com/package/@runner/generator-notify)
[![dependencies status](https://img.shields.io/david/runner/generator-notify.svg?style=flat-square)](https://david-dm.org/runner/generator-notify)
[![devDependencies status](https://img.shields.io/david/dev/runner/generator-notify.svg?style=flat-square)](https://david-dm.org/runner/generator-notify?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/runner)
[![RunKit](https://img.shields.io/badge/RunKit-try-yellow.svg?style=flat-square)](https://npm.runkit.com/@runner/generator-notify)


## Installation ##

```bash
npm install @runner/generator-notify
```


## Usage ##

Add to the scope:

```js
var generator = require('@runner/generator-notify');
```

Generate tasks according to the given config:

```js
var tasks = generator({
    warn: true,
    fail: true
});
```

Add generated tasks to the `runner` instance:

```js
var runner = require('runner');

Object.assign(runner.tasks, tasks);
```

The following tasks will become available:

 Task name       | Description
-----------------|-------------
 `notify:config` | prints the current configuration used for generated tasks
 `notify:start`  | starts showing system popup notification or warnings/errors 
 `notify:stop`   | stops popup notifications

Generator accepts two arguments: base configuration and additional options.


### Base configuration ###

It's an object with the following properties:

 Name | Description
------|-------------
 warn | notify on warnings (default: `false`)  
 fail | notify on errors (default: `true`)  


### Additional options ###

It's an object with the following properties:

 Name   | Description
--------|-------------
 prefix | an affix placed before a task name (default is `notify:`)  
 suffix | a string added at the end of a task name (empty by default)
 
So it's possible to change generated tasks names: 

```js
Object.assign(runner.tasks,
    generator(config, {
        prefix: 'popup:',
        suffix: ':develop'
    })
);
```

It will add the following tasks:

* `popup:config:develop` 
* `popup:start:develop`  
* `popup:stop:develop`  
 

## Contribution ##

If you have any problems or suggestions please open an [issue](https://github.com/runner/generator-notify/issues)
according to the contribution [rules](.github/contributing.md).


## License ##

`@runner/generator-notify` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).
