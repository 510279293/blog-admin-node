var express = require('express');
var router = express.Router();
var db = require('../../linkpool/dbmysql')
var resData = require('../../utils/reultApi')
/* GET users listing. */

router.post('/list', function(req, res, next){ //查询所有文章
  res.header('Access-Control-Allow-Origin', '*');
  let reqData = req.body
  let str = 'where '
  let isWhere = false
  for(let key in reqData){
    str+=`${key}=${reqData[key]},`
    isWhere = true
  }
  str=str.substring(0,str.length-1)
  let loginSql = `select * from art_list ${isWhere ? str: ''}`
  let _resData = JSON.parse(JSON.stringify(resData))
  db.query(loginSql,[],function(err,rows){
    if(rows){ //
      Object.assign(_resData,{
        data: rows.map(v => ({
          id: v.id,
          title: v.title,
          art_desc: v.art_desc,
          create_time: v.create_time,
        }))
      })
      res.json(_resData)
    }else{
      Object.assign(_resData,{
        message: '查询出错',
        success: false
      })
      res.json(_resData)
    }
  }) 
});


module.exports = router;
