var mysql = require('mysql')
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '666666',
  database: 'zqs'
})

db.connect();
module.exports = db
