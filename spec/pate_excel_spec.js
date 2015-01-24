/**
 * Pate Excel Jasmine tests
 */
var fs = require('fs');
var pate = require('../pate');
var formatter = require('./fixtures/format_lib.js');

describe("Pate", function() {

	it("should parse Excel-generated Template and apply data", function (done) {
		fs.readFile('spec/fixtures/excel/data.xml', 'utf8', function(err, xml) {
			fs.readFile('spec/fixtures/excel/purchase_order.html', 'utf8', function(err, tpl) {
				fs.readFile('spec/fixtures/excel/result.html', 'utf8', function(err, result) {
					pate.parse({
						tpl: tpl,
						xml: xml,
						xpath: '/*/data/dataRow',
						format_lib: formatter
					}, function (err, data) {
						expect(err).toBeFalsy();
						if(!err) {
							expect(data).toEqual(result.toString());
						}
						done();
					});
				});
			});
		});
	});
});