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
        var rootEl = xmlDoc.root().get(options.xpath, options.ns);

        var result = options.tpl.toString();

        // Mustache match
        result = result.replace(/\{\{(.*?)\}\}/g, function (m, t) {
            if(t.indexOf('(')>=0)
                return evalFn(t.replace(/\((.*?)\)/g, function (m, t) {
                    return '(' + xpathFn(t, rootEl, options.ns) + ')';
                }), options.format_lib);

            return xpathFn(t, rootEl, options.ns);
        });

        callback(null, result);

    } catch (e) {
        console.dir(e);
        return callback(e);
    }
};

/**
 * XPatch matcher function
 */
var xpathFn = function xpathFn(token, rootEl, ns) {
    var split = token.trim().split('@');
    var retVal = rootEl;

    var path = split[0].replace(/\/$/, "") || null;
    var attr = split[1] || null;

    if(path)
        retVal = retVal.get(path, ns);

    if(attr) {
        retVal = retVal ? retVal.attr(attr) : "";
        retVal = retVal ? retVal.value() : "";
    } else {
        retVal = retVal ? retVal.text() : "";
    }

    return retVal;
}

/**
 * Eval matcher function
 */
var evalFn = function evalFn(token, format_lib) {
    var splited = token.trim().split(/[\(\)]/g);

    if (splited.length < 3)
        return token;

    if (!format_lib)
        return token

    var fnstring = splited[0];
    var fnparams = splited.slice(1, splited.length - 1);
    var fn = format_lib[fnstring];

    if (typeof fn !== "function")
        return "";

    return fn.apply(null, fnparams);
}
