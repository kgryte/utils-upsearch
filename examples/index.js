'use strict';

var upsearch = require( './../lib' );

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



