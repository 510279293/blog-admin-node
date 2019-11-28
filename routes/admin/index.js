// var router = express.Router();
var usersRouter = require('./users');
var artRouter = require('./art');
var tagRouter = require('./tag');

module.exports = {
  usersRouter,
  artRouter,
  tagRouter,
};