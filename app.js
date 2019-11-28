var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var AppUseRoute = require('./routes/index');
// var usersRouter = require('./routes/admin/users');
// var artRouter = require('./routes/admin/art')
// var tagRouter = require('./routes/admin/tag')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// session
app.use(cookieParser('sessiontest'));
app.use(session({
  secret: 'sessiontest',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000  //过期时间，单位毫秒
  }
}))

//
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// 路由登录拦截
app.use(function(req,res, next){
  let url = req.originalUrl; //获取浏览器中当前访问的nodejs路由地址；
  let currentUser = req.session['currentUser'];
  console.log('currentUser: ============>  ', currentUser)
  if(url.includes('/client')) {
    console.log(url);
    next();
  } else if(currentUser==undefined && url !== '/users/login'){ //通过判断控制用户登录后不能访问登录页面；
      // return res.redirect('/');//页面重定向；
      return res.json({
        code: 200,
        message: '请登录',
        success: false,
      })
  }
})

// node路由配置
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/art', artRouter)
// app.use('/tag', tagRouter)
AppUseRoute(app);

// catch 404 and forward to error handler (捕获异常)
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
