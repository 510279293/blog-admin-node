var express = require('express');
var router = express.Router();

var adminRouter = require('./admin');
var clientRouter = require('./client');
/* GET home page. */
var indexRouter = router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const AppUseRoute = function(app){
  app.use('/', indexRouter);
  app.use('/users', adminRouter.usersRouter);
  app.use('/art', adminRouter.artRouter);
  app.use('/tag', adminRouter.tagRouter);
  
  app.use('/client/users', clientRouter.usersRouter);
  app.use('/client/art', clientRouter.artRouter);

}

module.exports = AppUseRoute;
