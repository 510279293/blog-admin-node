var express = require('express');
var router = express.Router();
var db = require('../../linkpool/dbmysql')
var resData = require('../../utils/reultApi')
/* GET users listing. */

// 获取用户信息
router.get('/info', function(req,res, next){
  let loginSql = `select * from users where userName = 'zqs'`
  let _resData = JSON.parse(JSON.stringify(resData))
  db.query(loginSql,[],function(err,rows){
    try {
      if(rows.length ==1){ //可以登陆了
        delete rows[0].password;
        Object.assign(_resData,{
          message: '',
          success: true,
          data: rows[0],
        })
        res.json(_resData)
      }else{
        Object.assign(_resData,{
          message: '获取用户信息失败!',
          success: false
        })
        res.json(_resData)
      }
    } catch ({ err }) {
      res.json(err)
    }

  }) 
})

module.exports = router;
