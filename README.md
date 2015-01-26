[!logo](https://raw.githubusercontent.com/benoror/node-pate/master/resources/logo.png)

# About

Pâté is a simple XPath-oriented, express-compatible template engine for Node.js

# Installation

    npm install node-pate

# Dependencies

Pâté depends on [libxmljs](https://github.com/polotek/libxmljs), thus compilation is needed via [node-gyp](https://github.com/TooTallNate/node-gyp)

Dependencies [source](https://github.com/TooTallNate/node-gyp#installation):
- **Python**
    - Unix: Python v2.7
    - Windows: [v2.7.3](http://www.python.org/download/releases/2.7.3#download)
- **C/C++ Compiler**
    - Unix: GCC
    - Windows: [Visual Studio C++ 2010 Express](http://go.microsoft.com/?linkid=9709949)

# Basic usage

    var pate = require('node-pate');
    var formatter = require('./format_lib.js');

    var options = {
        tpl: '{{ bread/@name }} price: $[[ formatMoney({{ bread/@price }}) ]] ([[ moneyToWords({{ bread/@price }}) ]])',
        xml: '<data><row><bread name="Bretzel" price="42.56" /></row></data>',
        xpath: '/*/*',
        format_lib: formatter
    };

	pate.parse(options, function (err, data) {
        console.log(data);
	});

Output:

	Bretzel price: $42.56 (CUARENTA Y DOS PESOS CON 56/100)

# Express example

Application:

    var express = require('express');
    var app = express();
    var router = express.Router();

    var pate = require('node-pate');
    var formatter = require('./format_lib.js')

    // view engine setup
    app.engine('html', pate.__express);
    app.set('views', path.join(__dirname, 'views'));

    ...

    router.get('/test', function(req, res, next) {
      res.render('templates/test.html', {
        xml: '<data><row><bread name="Bretzel" price="42.56" /></row></data>',
        xpath: '/*/*',
        format_lib: formatter
      });
    });

Test:

    cd test-express && node bin/www

Go to: http://localhost:3000/test

# Status

This software is still evolving. There are likely cases that it cannot handle, so file a feature request in github if there is something you think it should do.

# Limitations

- No array support
- No support for namespaces

# Inspirations

https://github.com/dnewcome/jath

# License

Pâté is provided under the MIT free software license. See the file LICENSE for the full text.