var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
var jsonWrite = function (res, ret, msg) {
  if (typeof ret === 'undefined') {
    res.send({
      code: 500,
      msg
    })
  } else {
    res.send({
      code: 200,
      msg
    })
  }
}

// 增加用户接口
router.post('/addUser', (req, res) => {
  let sql = $sql.user.add
  let params = req.body
  // console.log(params)
  conn.query(sql, [params.username, params.password, params.age], function (err, result) {
    if (err) {
      console.log('添加失败' + err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})


// 登录接口
router.post('/login', (req, res) => {
  let sql = $sql.user.query
  let params = req.body
  // console.log("🚀 ~ file: userApi.js ~ line 46 ~ router.post ~ params", params)
  conn.query(sql, [params.username, params.password], function (err, result) {
    console.log("🚀 ~ file: userApi.js ~ line 48 ~ result", result)
    if (err) {
      console.log('查询失败' + err)
    }
    if (result.length) {
      res.send({
        code: 200,
        msg: '登录成功'
      })
    }else{
      res.send({
        code: 500,
        msg: '查询失败'
      })
    }
  })
})

// 增加用户接口
router.post('/logisn', (req, res) => {
  let sql = $sql.user.query
  let params = req.body
  // console.log("🚀 ~ file: userApi.js ~ line 46 ~ router.post ~ params", params)
  conn.query(sql, [params.username, params.password], function (err, result) {
    console.log("🚀 ~ file: userApi.js ~ line 48 ~ result", result)
    if (err) {
      console.log('查询失败' + err)
    }
    if (result.length) {
      res.send({
        code: 200,
        msg: '登录成功'
      })
    }else{
      res.send({
        code: 500,
        msg: '查询失败'
      })
    }
  })
})

module.exports = router
