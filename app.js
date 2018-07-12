const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let buildings = new Array();

app.get('/',(req,res)=>{
    res.render('index');
}).get('/content',(req,res)=>{
    buildings.map(obj=>{
   if(obj.name===req.query.search)
       res.render('content',{building:obj});
});res.render('404');
}).post('/register',(req,res)=>{
    buildings.push(req.body);
    res.send(req.body);
}).put('/check',(req,res)=>{
    let building = req.body;
    buildings.map((obj)=>{
        if(obj.name === building.name)
            obj.occupiedToilet = building.occupiedToilet;
    });
    res.send('ok');
}).put('/light',(req,res)=>{
    let building = req.body;
    buildings.map(obj=>{
        if(obj.name === building.name)
            obj.light = building.light;
    })
});
// catch 404 and forward to error handler
app.use((req, res, next)=>{
    next(createError(404));
});

// error handler
app.use((err, req, res)=>{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
