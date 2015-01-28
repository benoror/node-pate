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
			tpl: 'ROW ID: {{ @id }} -- Object: {{ object }} -- Bread: {{ bread/@type }} (count: {{ bread/count }} {{ bread/count/@unit }})',
			xml: '<data><row id="28"><object>Knife</object><bread type="Bretzel"><count unit="pc">42</count></bread></row></data>',
			xpath:  '/*/*',
		}, function (err, data) {
			expect(err).toBeFalsy();
			if(!err) {
				expect(data).toEqual("ROW ID: 28 -- Object: Knife -- Bread: Bretzel (count: 42 pc)");
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