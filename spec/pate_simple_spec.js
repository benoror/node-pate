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

	it("should return empty-string on not-found paths", function (done) {
		pate.parse({
			tpl: 'ROW ID: {{ @id }} -- Object: {{ object }} -- Bread: {{ bread/@type }} (count: {{ bread/count }} {{ bread/count/@unit }})',
			xml: '<data><row></row></data>',
			xpath:  '/*/*',
		}, function (err, data) {
			expect(err).toBeFalsy();
			if(!err) {
				expect(data).toEqual("ROW ID:  -- Object:  -- Bread:  (count:  )");
			}
			done();
		});
	});

	it("should return Error on not-found main XPath", function (done) {
		pate.parse({
			tpl: ' - ',
			xml: '<data><row></row></data>',
			xpath:  '/data/row/ghost',
		}, function (err, data) {
			expect(err).toBeFalsy();
			expect(data).toEqual(' - ');
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

	it("should support XML Namespaces", function (done) {
		pate.parse({
			tpl: 'ROW ID: {{ @id }}',
			xml: [
				'<?xml version="1.0" encoding="UTF-8"?>',
				'<entity xmlns:px="urn:panax">',
					'<px:other>',
					'</px:other>',
					'<px:data>',
						'<px:row id="666">',
						'</px:row>',
					'</px:data>',
				'</entity>'
			].join(''),
			xpath:  '/entity/px:data/px:row',
			ns: {
				px: 'urn:panax'
			}
		}, function (err, data) {
			expect(err).toBeFalsy();
			if(!err) {
				expect(data).toEqual("ROW ID: 666");
			}
			done();
		});
	});
});