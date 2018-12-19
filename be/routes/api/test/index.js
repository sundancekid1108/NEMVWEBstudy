var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.get('/hello', function(req, res, next) {
    res.send({ a: 2 })
});

module.exports = router;