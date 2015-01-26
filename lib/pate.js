var libxmljs = require('libxmljs');

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

    try {
        var xmlDoc = libxmljs.parseXmlString(options.xml);
        var rootEl = xmlDoc.root().get(options.xpath);

        global.pate = {};
        global.pate.format_lib = options.format_lib;

        var new_tpl = options.tpl.toString();

        // XPath match
        new_tpl = new_tpl.replace(/\{\{(.*?)\}\}/g, function (m, t) { return xpathFn(m, t, rootEl); });
        // Eval match
        new_tpl = new_tpl.replace(/\[\[(.*?)\]\]/g, function (m, t) { return evalFn(m, t); });

        callback(null, new_tpl);
    } catch (e) {
        return callback(e);
    }
};

/**
 * XPatch matcher function
 */
function xpathFn(match, token, rootEl) {
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

    if (splited.length < 3)
        return token;

    var format_lib = global['pate']['format_lib'];

    if (!format_lib)
        return token

    var fnstring = splited[0];
    var fnparams = splited.slice(1, splited.length - 1);
    var fn = format_lib[fnstring];

    if (typeof fn !== "function")
        return token;

    return fn.apply(null, fnparams);
}
