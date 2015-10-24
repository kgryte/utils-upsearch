/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	upsearch = require( './../lib/sync.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'sync', function tests() {

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
				upsearch( value );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
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
				upsearch( __dirname, value );
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
				upsearch( __dirname, { 'dir': value } );
			};
		}
	});

	it( 'should return `null` if unable to resolve a path', function test() {
		var path = upsearch( 'beepboopbebop', {} );
		assert.isNull( path );
	});

	it( 'should return resolve a path (file)', function test() {
		var res = upsearch( 'package.json' );
		assert.strictEqual( res, path.resolve( __dirname, '../package.json' ) );
	});

	it( 'should return resolve a path (directory)', function test() {
		var base,
			dir,
			res;

		dir = path.resolve( __dirname, '..' );
		base = path.basename( dir );
		res = upsearch( base );
		assert.strictEqual( res, dir );
	});

	it( 'should return resolve a path when provided a starting directory', function test() {
		var res = upsearch( 'package.json', {
			'dir': path.join( __dirname, 'beep/boop/bap/bop' )
		});
		assert.strictEqual( res, path.resolve( __dirname, '../package.json' ) );
	});

});
