var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/success', function(req, res, next) {
//   res.render('success');

// });
router.get('/success', function (req, res, next) {
  res.render('index', {
    title: 'Coaching Globedreamers'
  });
})


module.exports = router;