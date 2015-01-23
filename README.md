# About

Pâté is a simple XPath-oriented, express-compatible template engine for Node.js

# Installation

    npm install node-pate --save

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

Pate is provided under the MIT free software license. See the file LICENSE for the full text.