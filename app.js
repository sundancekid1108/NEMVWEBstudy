var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//var setRouter = require('./routes/set')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'fe', 'dist')));
//public에 파일 있으면 밑으로 내려가지 않고 public으로 감
//밑의 indexRouter가 위에 있으면 위에꺼 실행..
//fe, dist에서 /fe/dist의 index.html로 가이드

app.use('/api', require('./routes/api'));
//여기서 이제 백엔드 작업..

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('/set', setRouter);



// catch 404 and forward to error handler
//Router에 없는건 여기로 감..  next에서 처리
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
    res.render('error');
});
module.exports = app;