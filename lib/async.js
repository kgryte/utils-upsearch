'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isFunction = require( 'validate.io-function' ),
	isObject = require( 'validate.io-object' ),
	cwd = require( 'utils-cwd' ),
	exists = require( 'utils-fs-exists' ),
	resolve = require( 'path' ).resolve;


// UP SEARCH //

/**
* FUNCTION: upsearch( path, [options,] clbk )
*	Attempts to resolve a path by walking up from a specified directory.
*
* @param {String} path - path to resolve
* @param {Object} [options] - function options
* @param {String} [options.dir] - directory from which to begin the search
* @param {Function} clbk - callback to invoke after attempting to resolve a path
* @returns {Void}
*/
function upsearch( path, options, clbk ) {
	var spath,
		child,
		opts,
		done,
		dir;

	if ( !isString( path ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string primitive. Value: `' + path + '`.' );
	}
	if ( arguments.length > 2 ) {
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
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
		}
		done = clbk;
	} else {
		opts = {};
		done = options;
		if ( !isFunction( done ) ) {
			throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + done + '`.' );
		}
	}
	// Resolve the search directory to an absolute path...
	if ( dir === void 0 ) {
		dir = cwd();
	} else {
		dir = resolve( cwd(), dir );
	}
	spath = resolve( dir, path );
	exists( spath, onExists );

	/**
	* FUNCTION: onExists( error, bool )
	*	Callback invoked after checking for path existence.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {Boolean} bool - boolean indicating if a path exists
	* @returns {Void}
	*/
	function onExists( error, bool ) {
		if ( bool ) {
			return done( null, spath );
		}
		// Resolve a parent directory...
		child = dir;
		dir = resolve( dir, '..' );

		// If we have already reached root, we cannot resolve any higher directories...
		if ( child === dir ) {
			return done( null, null );
		}
		// Resolve the next search path...
		spath = resolve( dir, path );
		exists( spath, onExists );
	}
} // end FUNCTION upsearch()


// EXPORTS //

module.exports = upsearch;
