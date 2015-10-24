/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	upsearch = require( './../lib' );


// VARIABLES //

var expect = chai.expect;


// TESTS //

describe( 'utils-upsearch', function tests() {

	it( 'should export a function', function test() {
		expect( upsearch ).to.be.a( 'function' );
	});

	it( 'should export a function to read an entire file synchronously', function test() {
		expect( upsearch.sync ).to.be.a( 'function' );
	});

});
