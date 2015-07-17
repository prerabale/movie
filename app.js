var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('views', './views/pages' );
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, './bower_components')));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
app.get( '/', function( req, res ){
  res.render( 'index', {
    title : 'Movie 首页'
  });
});
*/
app.get( '/', function( req, res ){
  res.render('index',{
    title: 'Movie 首页',
    movies: [{
    title: '机械战警',
    _id: 1,
    poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
    title: '机械战警',
    _id: 2,
    poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
    title: '机械战警',
    _id: 3,
    poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
    title: '机械战警',
    _id: 4,
    poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
    title: '机械战警',
    _id: 5,
    poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    },{
    title: '机械战警',
    _id: 6,
    poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    }]
  });
});
app.get( '/detail/:id', function( req, res ){
  res.render( 'detail', {
    title : 'Movie 详情页'
  });
});
app.get( '/admin/movie', function( req, res ){
  res.render( 'admin', {
    title : 'Movie 后台录入页'
  });
});
app.get( '/list/:id', function( req, res ){
  res.render( 'list', {
    title : 'Movie 列表页'
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
