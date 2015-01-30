/**
 * Pate Formatting Jasmine tests
 */
var fs = require('fs');
var pate = require('..');
var formatter = require('./fixtures/format_lib.js');

describe("Pate Formatting", function() {

	it("should parse simple Formatting Templates", function(done) {
		pate.parse({
			tpl: '{{ bread/@name }} price: ${{ formatMoney(bread/@price) }} ({{ moneyToWords(bread/@price) }})',
			xml: '<data><row><bread name="Bretzel" price="42.5600" /></row></data>',
			xpath: '/*/*',
			format_lib: formatter
		}, function(err, data) {
				expect(err).toBeFalsy();
				if (!err) {
					var str = 'Bretzel price: $42.56 (CUARENTA Y DOS PESOS CON 56/100)';
					expect(data.toString()).toEqual(str);
				}
				done();
			});
	});
});