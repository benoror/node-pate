/**
 * Pate Simple Jasmine tests
 */
var fs = require('fs');
var pate = require('..');
var formatter = require('./fixtures/format_lib.js');

describe("Pate", function() {

	it("should parse a COMPLETE Template", function (done) {
		fs.readFile('spec/fixtures/complete/data.xml', 'utf8', function(err, xml) {
			fs.readFile('spec/fixtures/complete/template.txt', 'utf8', function(err, tpl) {
				fs.readFile('spec/fixtures/complete/result.txt', 'utf8', function(err, result) {
					pate.parse({
						tpl: tpl,
						xml: xml,
						xpath: '/entity/px:data/px:dataRow',
						ns: {
							px: 'urn:panax'
						},
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