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
  let _resData = JSON.parse(JSON.stringify(resData));
  db.query(loginSql,sqlData,function(err,rows){
    try {
      if(rows.length ==1 && rows[0].password == reqData.password){ //可以登陆了
        req.session['currentUser'] = reqData.userName; //  注意[设置session 必须要在发送客户端之前]
        Object.assign(_resData,{
          message: '',
          success: true
        })
        res.json(_resData);
      }else if(rows.length ==1 && rows[0].password != reqData.password){
        Object.assign(_resData,{
          message: '密码错误',
          success: false
        })
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
  let _resData = JSON.parse(JSON.stringify(resData))
  req.session['currentUser'] = undefined;
  res.json(_resData);
})

// 获取用户信息
router.post('/user/info', function(req,res, next){
  let reqData = req.body
  let loginSql = `select * from users where userName = ?`
  let sqlData = [reqData.userName]
  let _resData = JSON.parse(JSON.stringify(resData))
  db.query(loginSql,sqlData,function(err,rows){
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
})

// 修改用户信息
router.post('/user/update', function(req,res, next){
  let reqData = req.body;
  // let sqlStr = `select * from users where userName = ?`
  console.log(req);
  let _resData = JSON.parse(JSON.stringify(resData))
  res.json(_resData)
})


module.exports = router;
