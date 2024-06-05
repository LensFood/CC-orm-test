var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(process.env.APP_NAME);
});

router.get('/we', (req, res, next)=> {
  res.send('Hi ini Aplikasi Lensfood!')
})

module.exports = router;
