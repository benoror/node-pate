/**
 * Pate Simple Jasmine tests
 */
var fs = require('fs');
var pate = require('..');

describe("Pate", function() {

	it("should throw error with invalid XML", function (done) {
		pate.parse({
			tpl: '',
			xml: 'NOT_XML',
			xpath: ''
		}, function (err, data) {
			expect(err).not.toBeFalsy();
			done();
		});
	});

	it("should parse simple Template", function (done) {
		pate.parse({
			tpl: '{{ count/@type }} count: {{ count }}',
			xml: '<data><row><count type="Bretzel">42</count></row></data>',
			xpath:  '/*/*',
		}, function (err, data) {
			expect(err).toBeFalsy();
			if(!err) {
				expect(data).toEqual("Bretzel count: 42");
			}
			done();
		});
	});

	it("should parse basic Templates and apply data based on XPath placeholders", function (done) {
		fs.readFile('spec/fixtures/basic/data.xml', 'utf8', function(err, xml) {
			fs.readFile('spec/fixtures/basic/template.txt', 'utf8', function(err, tpl) {
				fs.readFile('spec/fixtures/basic/result.txt', 'utf8', function(err, result) {
					pate.parse({
						tpl: tpl,
						xml: xml,
						xpath: '/*/*/*'
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