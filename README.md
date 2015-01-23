# About

Pâté is a simple XPath-oriented, express-compatible template engine for Node.js

# Installation

    npm install node-pate --save

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

	pate.parse('{{ count/@type }} count: {{ count }}', '<data><row><count type="Bretzel">42</count></row></data>', '/*/*', function (err, data) {
		console.log(data);
	});

Outputs:

	Bretzel count: 42

# Express example

WIP

# Status

This software is still evolving. There are likely cases that it cannot handle, so file a feature request in github if there is something you think it should do.

# Limitations

- No array support
- No support for namespaces

# Inspirations

https://github.com/dnewcome/jath

# License

Pâté is provided under the MIT free software license. See the file LICENSE for the full text.