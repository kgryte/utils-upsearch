'use strict';

var path = require( 'path' ),
	upsearch = require( './../lib' );

var base,
	dir,
	out;

dir = path.resolve( __dirname, '..' );
base = path.basename( dir );

// Sync:
out = upsearch.sync( base, {
	'dir': __dirname
});
console.log( out );
// returns /path/to/upsearch

out = upsearch.sync( 'non_existent_basename' );
console.log( out );
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



