# mqtt-wildcard

[![NPM version](https://badge.fury.io/js/mqtt-wildcard.svg)](http://badge.fury.io/js/mqtt-wildcard)
[![Dependency Status](https://img.shields.io/gemnasium/hobbyquaker/mqtt-wildcard.svg?maxAge=2592000)](https://gemnasium.com/github.com/hobbyquaker/mqtt-wildcard)
[![Build Status](https://travis-ci.org/hobbyquaker/mqtt-wildcard.svg?branch=master)](https://travis-ci.org/hobbyquaker/mqtt-wildcard)
[![Coverage Status](https://coveralls.io/repos/github/hobbyquaker/mqtt-wildcard/badge.svg?branch=master)](https://coveralls.io/github/hobbyquaker/mqtt-wildcard?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![License][mit-badge]][mit-url]

> Match a MQTT Topic against Wildcards


## Install and Usage

```
$ npm install mqtt-wildcard
```

```javascript
var mqttWildcard = require('mqtt-wildcard');
```

Alternatively you can use bower to install mqtt-wildcard, AMD is also supported.


## API

_array|null_ mqttWildcard **(**_string_ **topic,** _string_ **wildcard)**

Returns `null` if not matched, otherwise an array containing the wildcards contents will be returned.

Examples:
```javascript
mqttWildcard('test/foo/bar', 'test/foo/bar'); // []
mqttWildcard('test/foo/bar', 'test/+/bar'); // ['foo']
mqttWildcard('test/foo/bar', 'test/#'); // ['foo/bar']
mqttWildcard('test/foo/bar/baz', 'test/+/#'); // ['foo', 'bar/baz']
mqttWildcard('test/foo/bar/baz', 'test/+/+/baz'); // ['foo', 'bar']

mqttWildcard('test', 'test/#'); // []
mqttWildcard('test/', 'test/#'); // ['']

mqttWildcard('test/foo/bar', 'test/+'); // null
mqttWildcard('test/foo/bar', 'test/nope/bar'); // null
```


## License

MIT (c) 2017 [Sebastian Raff](https://github.com/hobbyquaker)

[mit-badge]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat
[mit-url]: LICENSE
