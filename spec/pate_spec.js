/**
 * Pate Jasmine tests
 */
var fs = require('fs');
var pate = require('../pate');

describe("Pate", function() {

	xit("should throw error with invalid XML", function (done) {
		pate.parse("", "NOT_XML", '', function (err, data) {
			expect(err).not.toBeFalsy();
			done();
		});
	});

	xit("should parse simple Template", function (done) {
		pate.parse('{{ count/@type }} count: {{ count }}', '<data><row><count type="Bretzel">42</count></row></data>', '/*/*', function (err, data) {
			expect(err).toBeFalsy();
			if(!err) {
				expect(data).toEqual("Bretzel count: 42");
			}
			done();
		});
	});

	xit("should parse Template and apply data based on XPath placeholders", function (done) {
		fs.readFile('spec/fixtures/data.xml', function(err, xml) {
			fs.readFile('spec/fixtures/template.txt', function(err, tpl) {
				fs.readFile('spec/fixtures/result.txt', function(err, result) {
					pate.parse(tpl, xml, '/*/*/*', function (err, data) {
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

	it("should parse Excel-generated Template and apply data", function (done) {
		fs.readFile('spec/fixtures/excel/data.xml', function(err, xml) {
			fs.readFile('spec/fixtures/excel/purchase_order.html', function(err, tpl) {
				fs.readFile('spec/fixtures/excel/result.html', function(err, result) {
					pate.parse(tpl, xml, '/*/data/dataRow', function (err, data) {
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