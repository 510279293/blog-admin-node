var express = require('express');
var router = express.Router();
var db = require('../linkpool/dbmysql')
var resData = require('../utils/reultApi')
/* GET users listing. */

router.post('/login', function(req, res, next){ //查询所有用户
  res.header('Access-Control-Allow-Origin', '*');
  let reqData = req.body
  let loginSql = `select * from users where userName = ?`
  let sqlData = [reqData.userName]
  let _resData = JSON.parse(JSON.stringify(resData))
  db.query(loginSql,sqlData,function(err,rows){
    console.log(rows[0], reqData)
    try {
      if(rows.length ==1 && rows[0].password == reqData.password){ //可以登陆了
        Object.assign(_resData,{
          message: '',
          success: true
        })
        res.json(_resData)
      }else if(rows.length ==1 && rows[0].password != reqData.password){
        Object.assign(_resData,{
          message: '密码错误',
          success: false
        })
        console.log(_resData)
        res.json(_resData)
      }else{
        Object.assign(_resData,{
          message: '查无此人',
          success: false
        })
        res.json(_resData)
      }
    } catch ({ err }) {
      res.json(err)
    }

  }) 
});

// 登出
router.post('/logout', function(req, res, next){
  let reqData = req.body
  let _resData = JSON.parse(JSON.stringify(resData))
  res.json(_resData)
})

module.exports = router;
