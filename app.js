var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require( 'mongoose' );
var Movie = require( './models/movie.js' );

mongoose.connect( 'mongodb://127.0.0.1:27017/movie' );

var app = express();

// view engine setup
app.set('views', './views/pages' );
app.set('view engine', 'jade');
//app.use(bodyParser());
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
  Movie.fetch( function( err, movies ){
    if( err ){
      console.log( 'err :', err );
    }
    res.render('index',{
      title: 'Movie 首页',
      movies: movies
    });
  });
});
app.get( '/movie/:id', function( req, res ){
  res.render( 'detail', {
    title : 'Movie 详情页',
    movie : {
      doctor: '何塞·帕迪利亚',
      country: '美国',
      title: '机械战警',
      year: 2014,
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
      language: '英语',
      flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
      summary: '翻拍自1987年同名科幻经典，由《精英部队》导演何塞·帕迪利亚指执导的新版《机械战警》发布同款预告片。大热美剧《谋杀》男星乔尔·金纳曼化身新“机械战警”酷黑战甲亮相，加里·奥德曼、塞缪尔·杰克逊、迈克尔·基顿三大戏骨绿叶护航。预告片末更亮出了本片将登陆IMAX巨幕。新版《机械战警》故事背景跟原版一样，依旧设定在工业城市底特律，但故事年代已由之前设定的2020年变为2028年，并且故事格局也明显扩大。在片中，金纳曼饰演的好警察墨菲将会被歹徒“杀死”，然后被进行军火开发的机器人公司Omni Corp改造成半人半机器的“机械战警”。'
    }
  });
});
app.get( '/admin/movie', function( req, res ){
  res.render( 'admin', {
    title : 'Movie 后台录入页',
    movie : {
      title :'',
      doctor : '',
      country : '',
      language : '',
      year : '',
      summary : '',
      poster : '',
      flash : '',
    }
  });
});
app.get( '/admin/list', function( req, res ){
  console.log( 'comming list' );
  res.render( 'list', {
    title : 'Movie 列表页',
    movies : [{
      title : '机械战警',
      _id : 1,
      doctor : '何塞·帕迪里亚',
      country : '美国',
      year : 2014,
      language : '英语',
      flash : 'http://player.youku.com/player.php/sid/XNJA1Njc0NTUy/v.swf',
      summary:'翻拍自1987年同名科幻经典，由《精英部队》导演何塞·帕迪利亚指执导的新版《机械战警》发布同款预告片。大热美剧《谋杀》男星乔尔·金纳曼化身新“机械战警”酷黑战甲亮相，加里·奥德曼、塞缪尔·杰克逊、迈克尔·基顿三大戏骨绿叶护航。预告片末更亮出了本片将登陆IMAX巨幕。新版《机械战警》故事背景跟原版一样，依旧设定在工业城市底特律，但故事年代已由之前设定的2020年变为2028年，并且故事格局也明显扩大。在片中，金纳曼饰演的好警察墨菲将会被歹徒“杀死”，然后被进行军火开发的机器人公司Omni Corp改造成半人半机器的“机械战警”。'

    }]
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
  console.log('message:', err.message );
});


module.exports = app;
