/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	noop = require( '@kgryte/noop' ),
	upsearch = require( './../lib/async.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'async', function tests() {

	it( 'should export a function', function test() {
		expect( upsearch ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a path which is not a string primitive', function test() {
		var values,
			i;

		values = [
			5,
			NaN,
			null,
			true,
			undefined,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				upsearch( value, noop );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object (3 args)', function test() {
		var values,
			i;

		values = [
			'5',
			5,
			NaN,
			null,
			true,
			undefined,
			[],
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				upsearch( __dirname, value, noop );
			};
		}
	});

	it( 'should throw an error if provided a callback argument which is not a function (2 args)', function test() {
		var values,
			i;

		values = [
			'5',
			5,
			NaN,
			null,
			true,
			undefined,
			[],
			{}
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				upsearch( __dirname, value );
			};
		}
	});

	it( 'should throw an error if provided a callback argument which is not a function (3 args)', function test() {
		var values,
			i;

		values = [
			'5',
			5,
			NaN,
			null,
			true,
			undefined,
			[],
			{}
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				upsearch( __dirname, {}, value );
			};
		}
	});

	it( 'should throw an error if provided a `dir` option which is not a string primitive', function test() {
		var values,
			i;

		values = [
			5,
			NaN,
			null,
			true,
			undefined,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				upsearch( __dirname, { 'dir': value }, noop );
			};
		}
	});

	it( 'should return `null` if unable to resolve a path', function test( done ) {
		upsearch( 'beepboopbebop', clbk );
		function clbk( error, path ) {
			assert.isNull( path );
			done();
		}
	});

	it( 'should return resolve a path (file)', function test( done ) {
		upsearch( 'package.json', clbk );
		function clbk( error, res ) {
			assert.strictEqual( res, path.resolve( __dirname, '../package.json' ) );
			done();
		}
	});

	it( 'should return resolve a path (directory)', function test( done ) {
		var base,
			dir;

		dir = path.resolve( __dirname, '..' );
		base = path.basename( dir );
		upsearch( base, clbk );
		function clbk( error, res ) {
			assert.strictEqual( res, dir );
			done();
		}
	});

	it( 'should return resolve a path when provided a starting directory', function test( done ) {
		upsearch( 'package.json', {
			'dir': path.join( __dirname, 'beep/boop/bap/bop' )
		}, clbk );
		function clbk( error, res ) {
			assert.strictEqual( res, path.resolve( __dirname, '../package.json' ) );
			done();
		}
	});

});
