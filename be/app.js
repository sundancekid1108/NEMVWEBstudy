var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
const cors = require('cors') // 상단 아무곳이나 추가



app.use(cors()); // api 위에서 사용하겠다고 선언

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', require('./routes/api'))
app.use(express.static(path.join(__dirname, '../', 'fe', 'dist')));
//__dirname은 현재 폴더(여기선 be)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({ msg: err.message })
});

module.exports = app;