'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isObject = require( 'validate.io-object' ),
	cwd = require( 'utils-cwd' ),
	exists = require( 'utils-fs-exists' ).sync,
	resolve = require( 'path' ).resolve;


// UP SEARCH //

/**
* FUNCTION: upsearchSync( path[, options] )
*	Synchronously attempts to resolve a path by walking up from a specified directory.
*
* @param {String} path - path to resolve
* @param {Object} [options] - function options
* @param {String} [options.dir] - directory from which to begin the search
* @returns {String|Null} resolved path or null
*/
function upsearchSync( path, options ) {
	var spath,
		child,
		opts,
		dir;

	if ( !isString( path ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string primitive. Value: `' + path + '`.' );
	}
	if ( arguments.length > 1 ) {
		opts = options;
		if ( !isObject( opts ) ) {
			throw new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'dir' ) ) {
			dir = opts.dir;
			if ( !isString( dir ) ) {
				throw new TypeError( 'invalid option. Directory option must be a string primitive. Option: `' + dir + '`.' );
			}
		}
	} else {
		opts = {};
	}
	// Resolve the search directory to an absolute path...
	if ( dir === void 0 ) {
		dir = cwd();
	} else {
		dir = resolve( cwd(), dir );
	}
	// Start from the current search directory and continue moving up through each ancestor directory until able to resolve a search path...
	while ( child !== dir ) {
		spath = resolve( dir, path );
		if ( exists( spath ) ) {
			return spath;
		}
		child = dir;
		dir = resolve( dir, '..' );
	}
	return null;
} // end FUNCTION upsearchSync()


// EXPORTS //

module.exports = upsearchSync;
