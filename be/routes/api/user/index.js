var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.get('/', function(req, res, next) {
    const users = [{
            name: 'yang',
            age: 14
        },
        {
            name: 'sundance',
            age: 15
        }
    ]
    res.send({ users: users })
});

router.all('*', function(req, res, next) {
        next(createError(404, ' API가 없어요'));
    })
    //나머지것들은 없는걸로 가이드

module.exports = router;