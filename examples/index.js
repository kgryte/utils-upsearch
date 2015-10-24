'use strict';

var upsearch = require( './../lib' );

// Sync:
var path = upsearch.sync( 'upsearch', {
	'dir': __dirname
});
console.log( path );
// returns /path/to/upsearch

path = upsearch.sync( 'non_existent_basename' );
console.log( path );
// returns null


// Async:
upsearch( '.npmrc', { 'dir': process.cwd() }, onPath );
upsearch( './../non_existent_path', onPath );

function onPath( error, path ) {
	if ( error ) {
		throw error;
	}
	console.log( path );
}



