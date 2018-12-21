var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
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

const userSchema = new mongoose.Schema({
    name: { type: String, default: '', unique: true, index: true },
    age: { type: Number, default: 1 }
})

const User = mongoose.model('User', userSchema)
    //스키마

mongoose.connect('mongodb://localhost:27017/nemv', (err) => {
    if (err) return console.error(err)
    console.log('mongoose connected!')

    //User.create({ name: '하하하' })
    //    .then(r => console.log(r))
    //    .catch(e => console.log(e))

    //User.find()
    //    .then(r => console.log(r))
    //    .catch(e => console.log(e))

    //User.updateOne({ _id: '5c1c5f35ea40937042048feb' }, { $set: { age: 34 } })
    //    .then(r => {
    //        console.log(r)
    //        console.log('updated')
    //        return User.find()
    //    })
    //    .then(r => console.log(r))
    //    .catch(e => console.error(e))

    User.deleteOne({ _id: '5c1c5f35ea40937042048feb' })
        .then(r => {
            console.log(r)
            console.log('removed')
            return User.find()
        })
        .then(r => console.log(r))
        .catch(e => console.error(e))
        // delete할때는 reference참조하면서 해라 안그러면 DB 다 날릴수 있음..

}); // then, catch를 이용해서 사용 => promise chain, user.find => 프로미스로 리턴..






module.exports = app;