var express = require('express');
var createError = require('http-errors');
var router = express.Router();

const users = [{
        name: 'yang',
        age: 14
    },
    {
        name: 'sundance',
        age: 15
    }
]


router.get('/', function(req, res, next) {
    console.log(req.query)
    console.log(req.body)

    res.send({ users: users })
});

router.post('/', (req, res, next) => {
    console.log(req.query)
    console.log(req.body)
    res.send({ success: true, msg: 'post ok' })
})

router.put('/', (req, res, next) => {
    console.log(req.query)
    console.log(req.body)
    res.send({ success: true, msg: 'put ok' })
})

router.delete('/', (req, res, next) => {
    console.log(req.query)
    console.log(req.body)
    res.send({ success: true, msg: 'del ok' })
})



router.all('*', function(req, res, next) {
        next(createError(404, ' API가 없어요'));
    })
    //나머지것들은 없는걸로 가이드

module.exports = router;