var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/success', function (req, res, next) {
  res.render('../views/success.pug', {
    title: 'success'
  });
})


module.exports = router;
