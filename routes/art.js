var express = require('express');
var router = express.Router();
var db = require('../linkpool/dbmysql')
var resData = require('../utils/reultApi')
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
        data: rows
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

// 新增
router.post('/add', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  let reqData = req.body
  let loginSql = `INSERT INTO art_list
         (title,art_desc,keywords,tags,content,editContent,isdraft,create_time)
         VALUES(?,?,?,?,?,?,?,?)
         `
  let sqlData = [reqData.title,reqData.desc,reqData.keywords,reqData.tags,reqData.content,reqData.editContent,reqData.isdraft,new Date().getMilliseconds()]
  let _resData = JSON.parse(JSON.stringify(resData))
  db.query(loginSql,sqlData,function(err,rows){
    if(!err){
      Object.assign(_resData,{
        message: '新增成功',
      })
      res.json(_resData)
    }else{
      Object.assign(_resData,{
        message: '新增失败',
        success: false
      })
      res.json(_resData)
    }
  })
})

// 删除
router.post('/delete', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  let reqData = req.body
  let sqlStr = `DELETE FROM art_list WHERE id=?`
  let sqlData = [reqData.id]
  let _resData = JSON.parse(JSON.stringify(resData))
  db.query(sqlStr,sqlData,function(err,rows){
    if(!err){
      Object.assign(_resData,{
        message: '删除成功!',
      })
      res.json(_resData)
    }else{
      Object.assign(_resData,{
        message: '删除失败',
        success: false
      })
      res.json(_resData)
    }
  })
})

// 修改
router.post('/update', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  let reqData = req.body
  let sqlData = []
  let str = ''
  for(key in reqData){
    str += key+'=?,'
    sqlData.push(key)
  }
  let sqlStr = `update art_list set ${str} where id=?`
  let _resData = JSON.parse(JSON.stringify(resData))
  db.query(sqlStr,sqlData,function(err,rows){
    if(!err){
      Object.assign(_resData,{
        message: '修改成功',
      })
      res.json(_resData)
    }else{
      Object.assign(_resData,{
        message: '修改失败',
        success: false
      })
      res.json(_resData)
    }
  })
})

module.exports = router;
