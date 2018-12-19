var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.get('/hello', function(req, res, next) {
    res.send({ a: 1 })
});
// /api/hello로 가면  위에꺼 보임

router.get('/yyy', function(req, res, next) {
    res.send({ a: 2 })
});

router.use('/test', require('./test'))
router.use('/user', require('./user'))


router.all('*', function(req, res, next) {
        next(createError(404, ' API가 없어요'));
    })
    //나머지것들은 없는걸로 가이드

module.exports = router;