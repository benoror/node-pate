var fs = require('fs');
var libxmljs = require('libxmljs');

global.pate = {};
var rootEl;

/**
 * Parse XPath template
 *
 * @param  {String}   templateFile Template filename
 * @param  {String}   xml          XML Data
 * @param  {String}   xpath        XPath
 * @param  {Function} callback
 */
exports.parse = function parse(options, callback) {
	if (!options.tpl)
		return callback({message: 'Error: Missing Template'})
	if (!options.xml)
		return callback({message: 'Error: Missing XML string'})
	if (!options.xpath)
		return callback({message: 'Error: Missing XPath string'})

	global.pate.format_lib = options.format_lib;

	try {
		var xmlDoc = libxmljs.parseXmlString(options.xml);
		rootEl = xmlDoc.root().get(options.xpath);
	} catch (e) {
		return callback(e);
	}

	var new_tpl = options.tpl.toString();

	// XPath match
	new_tpl = new_tpl.replace(/\{\{(.*?)\}\}/g, xpathFn);
	// Eval match
	new_tpl = new_tpl.replace(/\[\[(.*?)\]\]/g, evalFn);

	callback(null, new_tpl);
};

/**
 * XPatch matcher function
 */
function xpathFn(match, token) {
	var splited = token.trim().split('/');
	var retVal = rootEl.get(splited[0]);

	if (splited.length < 2) {
		retVal = retVal.text();
	} else {
		splited[1] = splited[1].substr(1);
		retVal = retVal.attr(splited[1]).value();
	}

	return retVal;
}

/**
 * Eval matcher function
 * Based on: http://www.sitepoint.com/call-javascript-function-string-without-using-eval/
 */
function evalFn(match, token) {
	var splited = token.trim().split(/[\(\)]/g);

	if(splited.length < 3)
		return 'EVAL ERROR';

	var fnstring = splited[0];
	var fnparams = splited.slice(1, splited.length - 1);
	var fn = global['pate']['format_lib'][splited[0]];

	if (typeof fn === "function")
		return fn.apply(null, fnparams);

}

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

		this.parse(options, function(err, data) {
			if (err)
				return callback(err);

			callback(null, data);
		});
	});
};