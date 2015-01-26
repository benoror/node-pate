var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.render('templates/test.html', {
    xml: '<data><row><bread name="Bretzel" price="42.56" /></row></data>',
    xpath: '/*/*',
   	format_lib: require('../../spec/fixtures/format_lib.js')
  });
});

module.exports = router;
