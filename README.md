Upsearch
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Attempts to resolve a path by walking up from a specified directory.


## Installation

``` bash
$ npm install utils-upsearch
```


## Usage

``` javascript
var upsearch = require( 'utils-upsearch' );
```

#### upsearch( path, [ options,] clbk )

Attempts to resolve a (file or directory) `path` by walking up from a specified directory.

``` javascript
upsearch( '.npmrc', done );

function done( error, path ) {
	if ( error ) {
		console.error( error );
	} else {
		console.log( path );
	}
}
```

By default, the `function` begins searching in the [current working directory](https://github.com/kgryte/utils-cwd). To being searching from a different directory, set the `dir` option.

``` javascript
var opts = {
	'dir': '/path/to/a/directory'
};

upsearch( '.npmrc', opts, done );
```


#### upsearch.sync( path[, options] )

Synchronously attempts to resolve a (file or directory) `path` by walking up from a specified directory.

``` javascript
var path = upsearch.sync( '.npmrc' );
console.log( path );
```

To begin searching from a particular directory, set the `dir` option.

``` javascript
var opts = {
	'dir': '/path/to/a/directory'
};

var path = upsearch.sync( '.npmrc', opts );
console.log( path );
```



## Examples

``` javascript
var readFile = require( 'utils-upsearch' );

// Sync:
var path = upsearch.sync( 'upsearch', {
	'dir': __dirname
});
console.log( path );
// returns /path/to/upsearch

path = upsearch.sync( 'unknown_path' );
console.log( path );
// returns null


// Async:
upsearch( '.npmrc', { 'dir': process.cwd() }, onPath );
upsearch( './../unknown_path', onPath );

function onPath( error, path ) {
	if ( error ) {
		throw error;
	}
	console.log( path );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-upsearch.svg
[npm-url]: https://npmjs.org/package/utils-upsearch

[travis-image]: http://img.shields.io/travis/kgryte/utils-upsearch/master.svg
[travis-url]: https://travis-ci.org/kgryte/utils-upsearch

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/utils-upsearch/master.svg
[codecov-url]: https://codecov.io/github/kgryte/utils-upsearch?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-upsearch.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-upsearch

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-upsearch.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-upsearch

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-upsearch.svg
[github-issues-url]: https://github.com/kgryte/utils-upsearch/issues
