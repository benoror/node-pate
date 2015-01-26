var fs = require('fs');
var pate = require('./lib/pate')

/**
 * Register engine for ExpressJS
 *
 * @param  {String}   filename Template filename
 * @param  {Object}   options  Options: XML & XPath
 * @param  {Function} callback
 */
exports.__express = function(filename, options, callback) {
	fs.readFile(filename, 'utf8', function(err, tpl) {
		if (err)
			return callback(err);

		options.tpl = tpl;

		pate.parse(options, function(err, data) {
			if (err)
				return callback(err);

			callback(null, data);
		});
	});
};


exports.parse = pate.parse;