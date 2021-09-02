var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
// blog列表
router.post('/list', (req, res) => {
    const sqlList = $sql.blog.queryList
    let params = req.body
    const pageSize = params.pageSize || 10
    const pageStart = (params.page-1) * pageSize
    // console.log("🚀 ~ file: userApi.js ~ line 46 ~ router.post ~ params", params)
    conn.query(sqlList, [pageStart, pageSize], function (err, result) {
        console.log("🚀 ~ file: blogApi.js ~ line 97 ~ router.post ~ sqlList", sqlList)
      console.log("🚀 ~ file: userApi.js ~ line 48 ~ result", result)
      if (err) {
        console.log('查询失败' + err)
      }
        if (typeof result === 'undefined') {
            res.send({
                code: 500,
                msg: '查询失败'
            })
        }else{
            let sqlTotal = $sql.blog.queryTotal
            conn.query(sqlTotal, function (err, rows) {
             console.log("🚀 ~ file: blogApi.js ~ line 37 ~ total", rows[0].total)
             res.send({
                 code: 200,
                 data: {
                     data: result,
                     total: rows[0].total
                 },
                 msg: '查询成功'
             })
            })
        }
    })
  })


// 添加blog
router.post('/addBlog', (req, res) => {
  let sql = $sql.blog.add
  let params = req.body
  // console.log("🚀 ~ file: userApi.js ~ line 46 ~ router.post ~ params", params)
  conn.query(sql, [params.title, params.content], function (err, result) {
    console.log("🚀 ~ file: userApi.js ~ line 48 ~ result", result)
    if (err) {
      console.log('查询失败' + err)
    }
    if (typeof result === 'undefined') {
        res.send({
          code: 500,
          msg: '插入数据失败'
        })
      } else {
        res.send({
          code: 200,
          msg:  '插入数据成功'
        })
      }
  })
})


// update blog
router.post('/editBlog', (req, res) => {
    let sql = $sql.blog.edit
    let params = req.body
    conn.query(sql, [params.title, params.content, params.id], function (err, result) {
      console.log("editBlog~ result", result)
      if (err) {
        console.log('查询失败' + err)
      }
      if (typeof result === 'undefined') {
          res.send({
            code: 500,
            msg: '更新数据失败'
          })
        } else {
          res.send({
            code: 200,
            msg:  '更新数据成功'
          })
        }
    })
  })

  // del blog
router.post('/delBlog', (req, res) => {
    console.log("🚀 ~ file: blogApi.js ~ line 97 ~ router.post ~ req", req.query)
    let sql = $sql.blog.del
    let params = req.body
    console.log("🚀 ~ file: userApi.js ~ line 46 ~ router.post ~ ids", params.delIds)
    conn.query(sql, [params.delIds], function (err, result) {
        console.log("🚀 ~ file: blogApi.js ~ line 97 ~ router.post ~ sql", sql)
      console.log("delBlog result", result)
      if (err) {
        console.log('删除失败' + err)
      }
      if (typeof result === 'undefined') {
          res.send({
            code: 500,
            msg: '删除数据失败'
          })
        } else {
          res.send({
            code: 200,
            msg:  '删除数据成功'
          })
        }
    })
  })
module.exports = router
